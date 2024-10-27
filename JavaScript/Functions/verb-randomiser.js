class ToggleTenseRegButton {
    constructor(buttonElement) {
        this.isActivated = true;
        this.buttonElement = buttonElement;
        this.antagButton = null;
    }

    togButton() {
        if (this.antagButton.isActivated) {
            if (this.isActivated) {
                this.buttonElement.style.backgroundColor = '#D39B12'; // Color value as a string
                this.isActivated = false;
            } else {
                this.buttonElement.style.backgroundColor = '#A67B12'; // Color value as a string
                this.isActivated = true;
            }
        }
    }

    setAntagButton(antagButton) {
        this.antagButton = antagButton;
    }

    getIsActivated() { // Public getter method
        return this.isActivated;
    }
}

class FullVerb {
    constructor(yoP, tuP, elEllaP, nosoP, vosoP, ellosEllasP, yoI, tuI, elEllaI, nosoI, vosoI, ellosEllasI, engP, engI) {
        this.yoP = yoP;
        this.tuP = tuP;
        this.elEllaP = elEllaP;
        this.nosoP = nosoP;
        this.vosoP = vosoP;
        this.ellosEllasP = ellosEllasP;
        this.yoI = yoI;
        this.tuI = tuI;
        this.elEllaI = elEllaI;
        this.nosoI = nosoI;
        this.vosoI = vosoI;
        this.ellosEllasI = ellosEllasI;
        this.engP = engP;
        this.engI = engI;
    }

    getEngPret()
    {
        return this.engP;
    }

    getEngImp()
    {
        return this.engI
    }
}

class Verb {
    constructor(pronoun, fullVerb) {
        this.pronoun = pronoun;
        this.fullverb = fullVerb;
        this.engPret = fullVerb.getEngPret();
        this.fullEnglishPret = this.getFullEnglishPret(this.pronoun)
        this.engImp = fullVerb.getEngImp();
        this.fullEnglishImp = this.getFullEnglishImp(this.pronoun);
        this.spaPret = this.getSpaPret();
        this.spaImp = this.getSpaImp();
    }

    getFullEnglishImp(pronoun){
        if (pronoun == "We" || pronoun == "You" || pronoun == "Yous" || pronoun == "They (plural)") {
            return pronoun + " were " + this.engImp;
        }
    
        else if (pronoun == "I" || pronoun == "He" || pronoun == "She") {
            return pronoun + " was " + this.engImp;
        }
    }

    getFullEnglishPret(pronoun) {
        return pronoun + " " + this.engPret;
    }

    getSpaPret() {
        if (this.pronoun == "I") {
            return this.fullverb.yoP;
        }

        else if (this.pronoun == "You") {
            return this.fullverb.tuP;
        }

        else if (this.pronoun == "He" || this.pronoun == "She") {
            return this.fullverb.elEllaP;
        }

        else if (this.pronoun == "They (plural)") {
            return this.fullverb.ellosEllasP;
        }

        else if (this.pronoun == "We") {
            return this.fullverb.nosoP;
        }

        else if (this.pronoun == "Yous") {
            return this.fullverb.vosoP;
        }
    }

    getSpaImp() {
        if (this.pronoun == "I") {
            return this.fullverb.yoI;
        }

        else if (this.pronoun == "You") {
            return this.fullverb.tuI;
        }

        else if (this.pronoun == "He" || this.pronoun == "She") {
            return this.fullverb.elEllaI;
        }

        else if (this.pronoun == "They (plural)") {
            return this.fullverb.ellosEllasI;
        }

        else if (this.pronoun == "We") {
            return this.fullverb.nosoI;
        }

        else if (this.pronoun == "Yous") {
            return this.fullverb.vosoI;
        }
    }
}

class CurrentState {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            this.pretButton = new ToggleTenseRegButton(document.getElementById('pretButton'));
            this.impButton = new ToggleTenseRegButton(document.getElementById('impButton'));
            this.regButton = new ToggleTenseRegButton(document.getElementById('regButton'));
            this.irregButton = new ToggleTenseRegButton(document.getElementById('irregButton'));

            this.regenButton = document.getElementById('regenButton');
            this.revealAnswerButton = document.getElementById('showAnswerButton');

            this.pretButton.setAntagButton(this.impButton);
            this.impButton.setAntagButton(this.pretButton);
            this.regButton.setAntagButton(this.irregButton);
            this.irregButton.setAntagButton(this.regButton);

            this.pretButton.buttonElement.addEventListener('click', () => this.pretButton.togButton());
            this.impButton.buttonElement.addEventListener('click', () => this.impButton.togButton());
            this.regButton.buttonElement.addEventListener('click', () => this.regButton.togButton());
            this.irregButton.buttonElement.addEventListener('click', () => this.irregButton.togButton());

            this.pronoun = this.getRandomPronoun();
            this.text = document.getElementById("verbSentence");

            this.sentence = "";
            this.answer = "";

            this.tense = this.getCurrentValidTenses();
            this.regularity = this.getCurrentValidRegularity();
            this.finalVerb = this.getRandomVerb(this.getVerbArray())
            this.lastFinalVerb = this.finalVerb;
            this.generateSentence()
            this.showSentence()

            this.isSentenceShown = true;

            this.regenButton.addEventListener('click', () => {
                this.generateSentence();
            });

            this.revealAnswerButton.addEventListener('click', () => {
                if (this.getIsSentenceShown()){
                    this.showAnswer();
                }

                else if(this.getIsSentenceShown() == false){
                    this.showSentence();
                }
            });
        });
    }

    getIsSentenceShown(){
        return this.isSentenceShown
    }

    setIsSentenceShown(isShown){
        this.isSentenceShown = isShown
    }

    getSentence(){
        return this.sentence
    }

    setSentence(sentence){
        this.sentence = sentence
    }

    getLastFinalVerb() {
        return this.lastFinalVerb;
    }

    setLastFinalVerb(verb) {
        this.lastFinalVerb = verb
    }

    setTense(tense) {
        this.tense = tense;
    }

    getPronoun() {
        return this.pronoun;
    }

    setPronoun(pronoun) {
        this.pronoun = pronoun;
    }

    setRegularity(regularity){
        this.regularity = regularity;
    }

    setFinalVerb(verb){
        this.finalVerb = verb;
    }

    getAnswer(){
        return this.answer
    }

    getCurrentValidTenses() {
        console.log(this.pretButton);
        if (this.pretButton.getIsActivated() && this.impButton.getIsActivated()) {
            return Math.floor(Math.random() * 2) + 1; // imperfect, preterite
        }

        else if (this.pretButton.getIsActivated()) {
            return 1 // preterite
        }

        else if (this.impButton.getIsActivated()) {
            return 2 // imperfect
        }
    }

    getCurrentValidRegularity() {
        if (this.regButton.getIsActivated() && this.irregButton.getIsActivated()) {
            return Math.floor(Math.random() * 2) + 1; // regular, irregular
        }

        else if (this.regButton.getIsActivated()) {
            return 1;// regular
        }

        else if (this.irregButton.getIsActivated()) {
            return 2; // irregular
        }
    }

    getHeOrShe()
    {
        let list = ["He", "She"]
        return list[Math.floor(Math.random() * 2)];
    }

    getRandomPronoun() {
        const tenses = [
            "I",
            "You",
            this.getHeOrShe(),
            "They (plural)",
            "We",
            "Yous"
        ];

        const randomIndex = Math.floor(Math.random() * tenses.length);
        return tenses[randomIndex];
    }

    generateSentence() {
        this.setPronoun(this.getRandomPronoun())
        this.setTense(this.getCurrentValidTenses());
        this.setRegularity(this.getCurrentValidRegularity());
        this.setFinalVerb(this.getRandomVerb(this.getVerbArray()));
        
        if (this.tense == 1)
        {
            this.answer = this.finalVerb.spaPret;
            this.setSentence(this.finalVerb.fullEnglishPret);
        }

        else if (this.tense == 2)
        {
            this.answer = this.finalVerb.spaImp;
            this.setSentence(this.finalVerb.fullEnglishImp);
        }

        this.showSentence()
    }

    showSentence() {
        this.setIsSentenceShown(true);
        this.text.innerText = this.sentence;
        this.revealAnswerButton.innerText = "Show Answer";
    }

    showAnswer()
    {
        this.setIsSentenceShown(false);
        this.text.innerText = this.answer;
        this.revealAnswerButton.innerText = "Hide Answer";
    }

    pronounCheck(pronoun)
    {
        if (this.pronoun == pronoun)
        {
            return true;
        }
        return false
    }

    getRandomVerb(verbArray)
    {
        let finalVerb = "";
        while(this.getLastFinalVerb() == finalVerb){
            const randomIndex = Math.floor(Math.random() * verbArray.length);
            let randomVerb = verbArray[randomIndex];
            finalVerb = new Verb(this.pronoun, randomVerb)
        }
        this.setFinalVerb(finalVerb)
        return finalVerb;
    }

    getVerbArray()
    {
        let finalArray = [];
        
        let regularVerbs = [new FullVerb(
                           "hablé",   // yoP
                           "hablaste", // tuP
                           "habló",   // elEllaP
                           "hablamos", // nosoP
                           "hablasteis", // vosoP
                           "hablaron", // ellosEllasP
                           "hablaba", // yoI
                           "hablabas", // tuI
                           "hablaba", // elEllaI
                           "hablábamos", // nosoI
                           "hablabais", // vosoI
                           "hablaban", // ellosEllasI
                           "spoke",   // engP
                           "speaking" // engI
                            ),
                       
                           new FullVerb(
                               "comí",   // yoP
                               "comiste", // tuP
                               "comió",   // elEllaP
                               "comimos", // nosoP
                               "comisteis", // vosoP
                               "comieron", // ellosEllasP
                               "comía", // yoI
                               "comías", // tuI
                               "comía", // elEllaI
                               "comíamos", // nosoI
                               "comíais", // vosoI
                               "comían", // ellosEllasI
                               "ate",   // engP
                               "eating" // engI
                           ),
                               
                            new FullVerb(
                                "viví",   // yoP
                                "viviste", // tuP
                                "vivió",   // elEllaP
                                "vivimos", // nosoP
                                "vivisteis", // vosoP
                                "vivieron", // ellosEllasP
                                "vivía", // yoI
                                "vivías", // tuI
                                "vivía", // elEllaI
                                "vivíamos", // nosoI
                                "vivíais", // vosoI
                                "vivían", // ellosEllasI
                                "lived",   // engP
                                "living" // engI
                                  ),

                            new FullVerb(
                                   "trabajé",   // yoP
                                   "trabajaste", // tuP
                                   "trabajó",   // elEllaP
                                   "trabajamos", // nosoP
                                   "trabajasteis", // vosoP
                                   "trabajaron", // ellosEllasP
                                   "trabajaba", // yoI
                                   "trabajabas", // tuI
                                   "trabajaba", // elEllaI
                                   "trabajábamos", // nosoI
                                   "trabajabais", // vosoI
                                   "trabajaban", // ellosEllasI
                                   "worked",   // engP
                                   "working" // engI
                               ),

                            new FullVerb(
                                   "estudié",   // yoP
                                   "estudiaste", // tuP
                                   "estudió",   // elEllaP
                                   "estudiamos", // nosoP
                                   "estudiasteis", // vosoP
                                   "estudiaron", // ellosEllasP
                                   "estudiaba", // yoI
                                   "estudiabas", // tuI
                                   "estudiaba", // elEllaI
                                   "estudiábamos", // nosoI
                                   "estudiabais", // vosoI
                                   "estudiaban", // ellosEllasI
                                   "studied",   // engP
                                   "studying" // engI
                               ),

                            new FullVerb(
                                   "viajé",   // yoP
                                   "viajaste", // tuP
                                   "viajó",   // elEllaP
                                   "viajamos", // nosoP
                                   "viajasteis", // vosoP
                                   "viajaron", // ellosEllasP
                                   "viajaba", // yoI
                                   "viajabas", // tuI
                                   "viajaba", // elEllaI
                                   "viajábamos", // nosoI
                                   "viajabais", // vosoI
                                   "viajaban", // ellosEllasI
                                   "traveled",   // engP
                                   "traveling" // engI
                               ),

                            new FullVerb(
                                   "caminé",   // yoP
                                   "caminaste", // tuP
                                   "caminó",   // elEllaP
                                   "caminamos", // nosoP
                                   "caminasteis", // vosoP
                                   "caminaron", // ellosEllasP
                                   "caminaba", // yoI
                                   "caminabas", // tuI
                                   "caminaba", // elEllaI
                                   "caminábamos", // nosoI
                                   "caminabais", // vosoI
                                   "caminaban", // ellosEllasI
                                   "walked",   // engP
                                   "walking" // engI
                               ),

                            new FullVerb(
                                "jugé",   // yoP
                                "jugaste", // tuP
                                "jugó",   // elEllaP
                                "jugamos", // nosoP
                                "jugasteis", // vosoP
                                "jugaron", // ellosEllasP
                                "jugaba", // yoI
                                "jugabas", // tuI
                                "jugaba", // elEllaI
                                "jugábamos", // nosoI
                                "jugabais", // vosoI
                                "jugaban", // ellosEllasI
                                "played",   // engP
                                "playing" // engI
                            ),

                            new FullVerb(
                                "limpié",   // yoP
                                "limpiaste", // tuP
                                "limpió",   // elEllaP
                                "limpiamos", // nosoP
                                "limpiasteis", // vosoP
                                "limpiaron", // ellosEllasP
                                "limpiaba", // yoI
                                "limpiabas", // tuI
                                "limpiaba", // elEllaI
                                "limpiábamos", // nosoI
                                "limpiabais", // vosoI
                                "limpiaban", // ellosEllasI
                                "cleaned",   // engP
                                "cleaning" // engI
                            )
                           
                           
                        ]

        let irregularVerbs = [new FullVerb(
                             "fui",   // yoP (ir - to go)
                             "fuiste", // tuP
                             "fue",   // elEllaP
                             "fuimos", // nosoP
                             "fuisteis", // vosoP
                             "fueron", // ellosEllasP
                             "iba", // yoI
                             "ibas", // tuI
                             "iba", // elEllaI
                             "íbamos", // nosoI
                             "ibais", // vosoI
                             "iban", // ellosEllasI
                             "went",   // engP
                             "going" // engI
                             ),
                              
                             new FullVerb(
                                 "tuve",   // yoP (tener - to have)
                                 "tuviste", // tuP
                                 "tuvo",   // elEllaP
                                 "tuvimos", // nosoP
                                 "tuvisteis", // vosoP
                                 "tuvieron", // ellosEllasP
                                 "tenía", // yoI
                                 "tenías", // tuI
                                 "tenía", // elEllaI
                                 "teníamos", // nosoI
                                 "teníais", // vosoI
                                 "tenían", // ellosEllasI
                                 "had",   // engP
                                 "having" // engI
                             ),


                              new FullVerb(
                                  "hice",   // yoP (hacer - to do/make)
                                  "hiciste", // tuP
                                  "hizo",   // elEllaP
                                  "hicimos", // nosoP
                                  "hicisteis", // vosoP
                                  "hicieron", // ellosEllasP
                                  "hacía", // yoI
                                  "hacías", // tuI
                                  "hacía", // elEllaI
                                  "hacíamos", // nosoI
                                  "hacíais", // vosoI
                                  "hacían", // ellosEllasI
                                  "did/made",   // engP
                                  "doing/making" // engI
                              ),
                              new FullVerb(
                                  "dije",   // yoP (decir - to say)
                                  "dijiste", // tuP
                                  "dijo",   // elEllaP
                                  "dijimos", // nosoP
                                  "dijisteis", // vosoP
                                  "dijeron", // ellosEllasP
                                  "decía", // yoI
                                  "decías", // tuI
                                  "decía", // elEllaI
                                  "decíamos", // nosoI
                                  "decíais", // vosoI
                                  "decían", // ellosEllasI
                                  "said",   // engP
                                  "saying" // engI
                              ),
                              new FullVerb(
                                  "pude",   // yoP (poder - to be able to)
                                  "pudiste", // tuP
                                  "pudo",   // elEllaP
                                  "pudimos", // nosoP
                                  "pudisteis", // vosoP
                                  "pudieron", // ellosEllasP
                                  "podía", // yoI
                                  "podías", // tuI
                                  "podía", // elEllaI
                                  "podíamos", // nosoI
                                  "podíais", // vosoI
                                  "podían", // ellosEllasI
                                  "could",   // engP
                                  "being able to" // engI
                              ),
                              new FullVerb(
                                  "supe",   // yoP (saber - to know)
                                  "supiste", // tuP
                                  "supo",   // elEllaP
                                  "supimos", // nosoP
                                  "supisteis", // vosoP
                                  "supieron", // ellosEllasP
                                  "sabía", // yoI
                                  "sabías", // tuI
                                  "sabía", // elEllaI
                                  "sabíamos", // nosoI
                                  "sabíais", // vosoI
                                  "sabían", // ellosEllasI
                                  "knew",   // engP
                                  "knowing" // engI
                              ),
                              new FullVerb(
                                  "quise",   // yoP (querer - to want)
                                  "quisiste", // tuP
                                  "quiso",   // elEllaP
                                  "quisimos", // nosoP
                                  "quisisteis", // vosoP
                                  "quisieron", // ellosEllasP
                                  "quería", // yoI
                                  "querías", // tuI
                                  "quería", // elEllaI
                                  "queríamos", // nosoI
                                  "queríais", // vosoI
                                  "querían", // ellosEllasI
                                  "wanted",   // engP
                                  "wanting" // engI
                              ),
                              new FullVerb(
                                  "vine",   // yoP (venir - to come)
                                  "viniste", // tuP
                                  "vino",   // elEllaP
                                  "vinimos", // nosoP
                                  "vinisteis", // vosoP
                                  "vinieron", // ellosEllasP
                                  "venía", // yoI
                                  "venías", // tuI
                                  "venía", // elEllaI
                                  "veníamos", // nosoI
                                  "veníais", // vosoI
                                  "venían", // ellosEllasI
                                  "came",   // engP
                                  "coming" // engI
                              ),
                              new FullVerb(
                                  "traje",   // yoP (traer - to bring)
                                  "trajiste", // tuP
                                  "trajo",   // elEllaP
                                  "trajimos", // nosoP
                                  "trajisteis", // vosoP
                                  "trajeron", // ellosEllasP
                                  "traía", // yoI
                                  "traías", // tuI
                                  "traía", // elEllaI
                                  "traíamos", // nosoI
                                  "traíais", // vosoI
                                  "traían", // ellosEllasI
                                  "brought",   // engP
                                  "bringing" // engI
                              ),
                              new FullVerb(
                                  "vi",   // yoP (ver - to see)
                                  "viste", // tuP
                                  "vio",   // elEllaP
                                  "vimos", // nosoP
                                  "visteis", // vosoP
                                  "vieron", // ellosEllasP
                                  "veía", // yoI
                                  "veías", // tuI
                                  "veía", // elEllaI
                                  "veíamos", // nosoI
                                  "veíais", // vosoI
                                  "veían", // ellosEllasI
                                  "saw",   // engP
                                  "seeing" // engI
                              ),
                              new FullVerb(
                                  "di",   // yoP (dar - to give)
                                  "diste", // tuP
                                  "dio",   // elEllaP
                                  "dimos", // nosoP
                                  "disteis", // vosoP
                                  "dieron", // ellosEllasP
                                  "daba", // yoI
                                  "dabas", // tuI
                                  "daba", // elEllaI
                                  "dábamos", // nosoI
                                  "dabais", // vosoI
                                  "daban", // ellosEllasI
                                  "gave",   // engP
                                  "giving" // engI
                              ),
                              new FullVerb(
                                  "anduve",   // yoP (andar - to walk)
                                  "anduviste", // tuP
                                  "anduvo",   // elEllaP
                                  "anduvimos", // nosoP
                                  "anduvisteis", // vosoP
                                  "anduvieron", // ellosEllasP
                                  "andaba", // yoI
                                  "andabas", // tuI
                                  "andaba", // elEllaI
                                  "andábamos", // nosoI
                                  "andabais", // vosoI
                                  "andaban", // ellosEllasI
                                  "walked",   // engP
                                  "walking" // engI
                              ),
                              new FullVerb(
                                  "estuve",   // yoP (estar - to be)
                                  "estuviste", // tuP
                                  "estuvo",   // elEllaP
                                  "estuvimos", // nosoP
                                  "estuvisteis", // vosoP
                                  "estuvieron", // ellosEllasP
                                  "estaba", // yoI
                                  "estabas", // tuI
                                  "estaba", // elEllaI
                                  "estábamos", // nosoI
                                  "estabais", // vosoI
                                  "estaban", // ellosEllasI
                                  "was",   // engP
                                  "being" // engI
                              ),
                             
                        ]

        if (this.regularity == 1)
        {
            finalArray = regularVerbs;
        }

        else if (this.regularity == 2)
        {
            finalArray = irregularVerbs;
        }

        return finalArray
    }
}

let currentState = new CurrentState();