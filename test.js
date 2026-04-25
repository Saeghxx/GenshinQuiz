document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("quizzes")) return;
const quizzes = [
    {
        title: "Mondstadt Quiz",
        description: "A lore-based Mondstadt knowledge test.",
        questions: [
            {
                text: "What ancient artifact is said to contain the winds of Mondstadt bestowed by Barbatos himself?",
                options: [
                    { text: "Cecilia Flower", id: 1, isCorrect: false },
                    { text: "Holy Lyre der Himmel", id: 2, isCorrect: true },
                    { text: "The Sword of Descension", id: 3, isCorrect: false },
                    { text: "Dandelion Seed", id: 4, isCorrect: false },
                ],
            },
            {
                text: "Which historic event caused the Windrise tree to grow into its enormous size?",
                options: [
                    { text: "The end of the Archon War", id: 1, isCorrect: false },
                    { text: "Barbatos's battle against Dvalin", id: 2, isCorrect: false },
                    { text: "Vanessa's ascension to Celestia", id: 3, isCorrect: true },
                    { text: "The death of Decarabian", id: 4, isCorrect: false },
                ],
            },
            {
                text: "The Grand Master of the Knights of Favonius who was given the title 'Lion of Light' is?",
                options: [
                    { text: "Varka", id: 1, isCorrect: false },
                    { text: "Ravenwood", id: 2, isCorrect: false },
                    { text: "Rostam", id: 3, isCorrect: false },
                    { text: "Arundolyn", id: 4, isCorrect: true },
                ],
            },
            {
                text: `The west wind bears wine's fragrance away...
The mountain wind brings glad tidings new...
The breeze from afar tugs at my heart...
It sings of my longing for you.
This song is sung by:`,
                options: [
                    { text: "Barbara", id: 1, isCorrect: false },
                    { text: "Rosalyne", id: 2, isCorrect: true },
                    { text: "Venti", id: 3, isCorrect: false },
                    { text: "Vanessa", id: 4, isCorrect: false },
                ],
            },
            {
                text: "What item does Rostam give Rosalyne before she leaves Mondstadt?",
                options: [
                    { text: "A special crimson red rose", id: 1, isCorrect: false },
                    { text: "A special hydro timepiece", id: 2, isCorrect: true },
                    { text: "A special necklace made of Starsilver", id: 3, isCorrect: false },
                    { text: "A special set of wolf-leather clothes", id: 4, isCorrect: false },
                ],
            },
            {
                text: "Who was referred to as 'The Phantom Thief'?",
                options: [
                    { text: "Parsifal", id: 1, isCorrect: true },
                    { text: "Eberhart", id: 2, isCorrect: false },
                    { text: "Ingbert", id: 3, isCorrect: false },
                    { text: "Luther", id: 4, isCorrect: false },
                ],
            },
            {
                text: "Who masterminded the deaths of Landrich’s Sal Vindagnyr expedition?",
                options: [
                    { text: "Ingbert", id: 1, isCorrect: false },
                    { text: "Barca Lawrence", id: 2, isCorrect: false },
                    { text: "Eberhart", id: 3, isCorrect: true },
                    { text: "Priscilla", id: 4, isCorrect: false },
                ],
            },
            {
                text: 'Which witch wielded the Crescent Pike and "hunted the vile"?',
                options: [
                    { text: "Trismegistus", id: 1, isCorrect: false },
                    { text: "The Hydromancer", id: 2, isCorrect: false },
                    { text: "The Icy Spike Witch", id: 3, isCorrect: false },
                    { text: "Blue-Eyed Spear Witch", id: 4, isCorrect: true },
                ],
            },
            {
                text: "Which Hexenzirkel member is author of The Boar Princess?",
                options: [
                    { text: "I. Ivanovna N.", id: 1, isCorrect: false },
                    { text: "Andersdotter", id: 2, isCorrect: true },
                    { text: "Barbeloth", id: 3, isCorrect: false },
                    { text: "Nicole Reyn", id: 4, isCorrect: false },
                ],
            },
            {
                text: "Why did Alice found the Hexenzirkel?",
                options: [
                    { text: "To create a powerful weapon", id: 1, isCorrect: false },
                    { text: "To defeat the Abyss", id: 2, isCorrect: false },
                    { text: "To conduct Irminsul explorations", id: 3, isCorrect: true },
                    { text: "To pursue perfection", id: 4, isCorrect: false },
                ],
            },
    ],
},
{
    title: "Li Yue Quiz",
        description: "A lore-based Li Yue knowledge <br>test.",
        questions: [
            {
                text: "Who created the Blackcliff series weapon?",
                options: [
                    { text: "Han Wu", id: 1, isCorrect: true },
                    { text: "Yun Hui", id: 2, isCorrect: false },
                    { text: "Rex Lapis", id: 3, isCorrect: false },
                    { text: "Kunwu", id: 4, isCorrect: false },
                ],
            },
            {
                text: "Guoba was originally a god of stove known as..?",
                options: [
                    { text: "Marchosius", id: 1, isCorrect: true },
                    { text: "Haagentus", id: 2, isCorrect: false },
                    { text: "Kun Wu", id: 3, isCorrect: false },
                    { text: "Jiehu", id: 4, isCorrect: false },
                ],
            },
            {
                text: "Which of these is not created by Guizhong?",
                options: [
                    { text: "Memory of Dust", id: 1, isCorrect: false },
                    { text: "Jadefall's Splendor", id: 2, isCorrect: true },
                    { text: "Cleansing Bell", id: 3, isCorrect: false },
                    { text: "Guizhong Ballista", id: 4, isCorrect: false },
                ],
            },
            {
                text: '"The Nameless Yaksha" fought alongside the Millelith in defense of Liyue. His real name was?',
                options: [
                    { text: "Pervases", id: 1, isCorrect: false },
                    { text: "Menogias", id: 2, isCorrect: false },
                    { text: "Bonanus", id: 3, isCorrect: false },
                    { text: "Bosacius", id: 4, isCorrect: true },
                ],
            },
            {
                text: "Who were the three Adeptus that protected Chengyu Vale?",
                options: [
                    { text: "Fujin, The Herblord, Ling Yuan", id: 1, isCorrect: true },
                    { text: "Cloud Retainer, Mountain Shaper, Moon Carver", id: 2, isCorrect: false },
                    { text: "Guizhong, Streetward Rambler, Havria", id: 3, isCorrect: false },
                    { text: "Marchosius, Pervases, Cloud Retainer", id: 4, isCorrect: false },
                ],
            },
            {
                text: "Skipper, he is most well known for his quest for vengeance against a certain sea monster and his eventual success at the cost of his life. Who wielded?",
                options: [
                    { text: "Bloodtainted Greatsword", id: 1, isCorrect: false },
                    { text: "Luxurious Sea-Lord", id: 2, isCorrect: false },
                    { text: "Beacon of the Reed Sea", id: 3, isCorrect: false },
                    { text: "Serpent Spine", id: 4, isCorrect: true },
                ],
            },
            {
                text: "Which of these weapons is not created by Rex Lapis?",
                options: [
                    { text: "Jadefall's Splendor", id: 1, isCorrect: false },
                    { text: "Primordial Jade Cutter", id: 2, isCorrect: false },
                    { text: "Primordial Jade Winged-Spear", id: 3, isCorrect: false },
                    { text: "Vortex Vanquisher", id: 4, isCorrect: true },
                ],
            },
            {
                text: 'The "Adeptus" form mentioned in the book "Moonlit Bamboo Forest" is?',
                options: [
                    { text: "White Horse", id: 1, isCorrect: true },
                    { text: "White Crane", id: 2, isCorrect: false },
                    { text: "White Fish", id: 3, isCorrect: false },
                    { text: "White Fox", id: 4, isCorrect: false },
                ],
            },
            {
                text: "Which of these characters has not signed a contract with Rex Lapis?",
                options: [
                    { text: "Azhdaha", id: 1, isCorrect: false },
                    { text: "Yanfei", id: 2, isCorrect: true },
                    { text: "Alatus", id: 3, isCorrect: false },
                    { text: "Ganyu", id: 4, isCorrect: false },
                ],
            },
            {
                text: 'Changsheng offered to make the contract known as the "Way of the Dragon-Dragging Jade Snake" her secret arts of healing, but warned that it would give powerful healing abilities at the cost of..?',
                options: [
                    { text: "Health", id: 1, isCorrect: true },
                    { text: "Blood", id: 2, isCorrect: false },
                    { text: "Mora", id: 3, isCorrect: false },
                    { text: "Soul", id: 4, isCorrect: false },
                ],
            },
        ],
    },
{
        title: "Inazuma Quiz",
        description: "A lore-based Inazuma knowledge test.",
        questions: [
            {
                text: "Ei willingly sacrificed her (...) for Makoto to ascend to Celestia. What did she sacrifice?",
                options: [
                    { text: "Body", id: 1, isCorrect: true },
                    { text: "Soul", id: 2, isCorrect: false },
                    { text: "Power", id: 3, isCorrect: false },
                    { text: "Emotion", id: 4, isCorrect: false },
                ],
            },
            {
                text: "He was a famous bandit and pirate from Seirai Island. He commanded a fleet of over ten ships and helmed his flagship, 'Seiraimaru.' He was also the original wielder of 'The Catch.' His name is..?",
                options: [
                    { text: "Iwakura Michihiro", id: 1, isCorrect: false },
                    { text: "Ako Domeki Zaemon", id: 2, isCorrect: true },
                    { text: "Iwakura Mitsunari", id: 3, isCorrect: false },
                    { text: "Akatsuki Saemon Juuzou", id: 4, isCorrect: false },
                ],
            },
            {
                text: "The people of Byakuyakoku pleaded to be saved from the Dragonheirs, but the Heavenly Principles and three of its Four Shades did not answer. Only one of the other shining Shades did. And that is?",
                options: [
                    { text: "Orobashi", id: 1, isCorrect: false },
                    { text: "Aberaku", id: 2, isCorrect: false },
                    { text: "Ronova", id: 3, isCorrect: false },
                    { text: "Istaroth", id: 4, isCorrect: true },
                ],
            },
            {
                text: "When did Sasayuri die?",
                options: [
                    { text: "During the Cataclysm 500 years ago while fighting the Abyss monster", id: 1, isCorrect: false },
                    { text: "During the Archon War 2000 years ago fighting gods led him to perish", id: 2, isCorrect: false },
                    { text: "During a civil war between the Shogun and the people of the Great Serpent", id: 3, isCorrect: true },
                    { text: "During the rebellion of Seirai Island", id: 4, isCorrect: false },
                ],
            },
            {
                text: "How did Ruu die?",
                options: [
                    { text: "He was killed by Kanna Kapatcir, the enraged Thunderbird", id: 1, isCorrect: false },
                    { text: "He died during the Cataclysm 500 years ago to a Rifthound attack", id: 2, isCorrect: false },
                    { text: "He died due to his sickness", id: 3, isCorrect: false },
                    { text: "He was chosen as a living sacrifice and died at the Moshiri Ceremonial", id: 4, isCorrect: true },
                ],
            },
            {
                text: "Scaramouche experienced three betrayals. What is the second betrayal?",
                options: [
                    { text: "Niwa Hisahide fled and left the people to their fate", id: 1, isCorrect: true },
                    { text: "Abandoned by his creator", id: 2, isCorrect: false },
                    { text: "The death of a young boy because of his sickness", id: 3, isCorrect: false },
                    { text: "None of these answers is correct", id: 4, isCorrect: false },
                ],
            },
            {
                text: "Neko is an immortal cat who can speak the human language living in a shrine on Seirai Island. She waited for someone to return and that someone is?",
                options: [
                    { text: "Kitsune Saiguu", id: 1, isCorrect: false },
                    { text: "Asase Hibiki", id: 2, isCorrect: true },
                    { text: "Ako Domeki Zaemon", id: 3, isCorrect: false },
                    { text: "Takamine", id: 4, isCorrect: false },
                ],
            },
            {
                text: "Takamine was Asase Hibiki's love interest. Takamine finally emerged from the Abyss after going missing and being overwhelmed by it. He reunited with Asase Hibiki and then...",
                options: [
                    { text: "Asase Hibiki killed him by piercing him with an arrow", id: 1, isCorrect: true },
                    { text: "Takamine married her and they sailed together to Liyue", id: 2, isCorrect: false },
                    { text: "Takamine died in her arms for the last time as he could not last longer", id: 3, isCorrect: false },
                    { text: "Takamine was controlled by the Abyss and lost his mind then he killed Asase", id: 4, isCorrect: false },
                ],
            },
            {
                text: "The only forging sword art that survives in Raiden Gokuden is...?",
                options: [
                    { text: "Hyakume Art", id: 1, isCorrect: false },
                    { text: "Futsu Art", id: 2, isCorrect: false },
                    { text: "Isshin Art", id: 3, isCorrect: false },
                    { text: "Amenoma Art", id: 4, isCorrect: true },
                ],
            },
            {
                text: "Kitsune Saiguu tricked this character into playing hide and seek to protect them from the Cataclysm. Who is this character?",
                options: [
                    { text: "Asase Hibiki", id: 1, isCorrect: false },
                    { text: "Yae Miko", id: 2, isCorrect: false },
                    { text: "Ioroi", id: 3, isCorrect: true },
                    { text: "Mikoshi Doukei", id: 4, isCorrect: false },
                ],
            },
        ],
    }
];
localStorage.setItem("quizzes", JSON.stringify(quizzes));
});
