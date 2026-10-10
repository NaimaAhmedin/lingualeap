// ==========================================
// LinguaLeap - Lesson Data for All Age Groups
// ==========================================

import { Lesson, ConversationTopic } from '../types';

// ===================== KIDS (4-7) =====================
export const KIDS_LESSONS: Lesson[] = [
  {
    id: 'kids-vocab-1',
    category: 'vocabulary',
    title: 'Animals & Sounds',
    description: 'Learn the names of cute animals!',
    ageGroup: 'kids',
    difficulty: 1,
    estimatedMinutes: 5,
    xpReward: 20,
    icon: '🐶',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'vocabulary',
      items: [
        { id: 'k-v1-1', question: 'What animal says "Woof woof"?', options: ['Cat', 'Dog', 'Bird', 'Fish'], correctAnswer: 'Dog', explanation: 'A dog says "Woof woof"! 🐕', audioText: 'Dog. A dog says woof woof.' },
        { id: 'k-v1-2', question: 'What animal says "Meow"?', options: ['Horse', 'Cat', 'Snake', 'Pig'], correctAnswer: 'Cat', explanation: 'A cat says "Meow"! 🐱', audioText: 'Cat. A cat says meow.' },
        { id: 'k-v1-3', question: 'What animal has a long neck?', options: ['Elephant', 'Lion', 'Giraffe', 'Bear'], correctAnswer: 'Giraffe', explanation: 'A giraffe has a very long neck! 🦒', audioText: 'Giraffe. A giraffe has a very long neck.' },
        { id: 'k-v1-4', question: 'What animal lives in water?', options: ['Fish', 'Rabbit', 'Monkey', 'Chicken'], correctAnswer: 'Fish', explanation: 'Fish live in water! 🐟', audioText: 'Fish. Fish live in water.' },
        { id: 'k-v1-5', question: 'What animal has big ears?', options: ['Mouse', 'Snake', 'Elephant', 'Frog'], correctAnswer: 'Elephant', explanation: 'Elephants have very big ears! 🐘', audioText: 'Elephant. Elephants have very big ears.' },
      ],
    },
  },
  {
    id: 'kids-vocab-2',
    category: 'vocabulary',
    title: 'Colors Rainbow',
    description: 'Learn all the beautiful colors!',
    ageGroup: 'kids',
    difficulty: 1,
    estimatedMinutes: 5,
    xpReward: 20,
    icon: '🌈',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'vocabulary',
      items: [
        { id: 'k-v2-1', question: 'What color is the sky?', options: ['Red', 'Blue', 'Green', 'Yellow'], correctAnswer: 'Blue', explanation: 'The sky is blue! ☁️', audioText: 'Blue. The sky is blue.' },
        { id: 'k-v2-2', question: 'What color is grass?', options: ['Orange', 'Purple', 'Green', 'Pink'], correctAnswer: 'Green', explanation: 'Grass is green! 🌿', audioText: 'Green. Grass is green.' },
        { id: 'k-v2-3', question: 'What color is a banana?', options: ['Yellow', 'Blue', 'Red', 'Black'], correctAnswer: 'Yellow', explanation: 'A banana is yellow! 🍌', audioText: 'Yellow. A banana is yellow.' },
        { id: 'k-v2-4', question: 'What color is a fire truck?', options: ['White', 'Green', 'Blue', 'Red'], correctAnswer: 'Red', explanation: 'Fire trucks are red! 🚒', audioText: 'Red. Fire trucks are red.' },
        { id: 'k-v2-5', question: 'What color is snow?', options: ['Black', 'Brown', 'White', 'Gray'], correctAnswer: 'White', explanation: 'Snow is white! ⛄', audioText: 'White. Snow is white.' },
      ],
    },
  },
  {
    id: 'kids-vocab-3',
    category: 'vocabulary',
    title: 'My Body Parts',
    description: 'Point and learn body parts!',
    ageGroup: 'kids',
    difficulty: 1,
    estimatedMinutes: 5,
    xpReward: 20,
    icon: '🖐️',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'vocabulary',
      items: [
        { id: 'k-v3-1', question: 'You use these to see:', options: ['Ears', 'Eyes', 'Hands', 'Feet'], correctAnswer: 'Eyes', explanation: 'We use our eyes to see! 👀', audioText: 'Eyes. We use our eyes to see.' },
        { id: 'k-v3-2', question: 'You use these to hear:', options: ['Nose', 'Mouth', 'Ears', 'Toes'], correctAnswer: 'Ears', explanation: 'We use our ears to hear! 👂', audioText: 'Ears. We use our ears to hear.' },
        { id: 'k-v3-3', question: 'You use this to smell:', options: ['Nose', 'Hand', 'Leg', 'Eye'], correctAnswer: 'Nose', explanation: 'We use our nose to smell! 👃', audioText: 'Nose. We use our nose to smell.' },
        { id: 'k-v3-4', question: 'You clap with your:', options: ['Feet', 'Knees', 'Hands', 'Elbows'], correctAnswer: 'Hands', explanation: 'We clap with our hands! 👏', audioText: 'Hands. We clap with our hands.' },
        { id: 'k-v3-5', question: 'You walk with your:', options: ['Arms', 'Hands', 'Head', 'Feet'], correctAnswer: 'Feet', explanation: 'We walk with our feet! 🦶', audioText: 'Feet. We walk with our feet.' },
      ],
    },
  },
  {
    id: 'kids-pronunciation-1',
    category: 'pronunciation',
    title: 'Say Hello!',
    description: 'Practice saying greetings!',
    ageGroup: 'kids',
    difficulty: 1,
    estimatedMinutes: 5,
    xpReward: 25,
    icon: '👋',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'pronunciation',
      items: [
        { id: 'k-p1-1', question: 'Say: "Hello!"', correctAnswer: 'Hello', explanation: 'Great job saying hello!', audioText: 'Hello!' },
        { id: 'k-p1-2', question: 'Say: "Good morning!"', correctAnswer: 'Good morning', explanation: 'We say this in the morning!', audioText: 'Good morning!' },
        { id: 'k-p1-3', question: 'Say: "Thank you!"', correctAnswer: 'Thank you', explanation: 'Always say thank you!', audioText: 'Thank you!' },
        { id: 'k-p1-4', question: 'Say: "Please!"', correctAnswer: 'Please', explanation: 'Please is a magic word!', audioText: 'Please!' },
        { id: 'k-p1-5', question: 'Say: "Goodbye!"', correctAnswer: 'Goodbye', explanation: 'We say goodbye when leaving!', audioText: 'Goodbye!' },
      ],
    },
  },
  {
    id: 'kids-listening-1',
    category: 'listening',
    title: 'Listen & Pick',
    description: 'Listen carefully and choose!',
    ageGroup: 'kids',
    difficulty: 1,
    estimatedMinutes: 5,
    xpReward: 25,
    icon: '👂',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'listening',
      items: [
        { id: 'k-l1-1', question: 'Listen and pick the right word:', options: ['Apple', 'Banana', 'Orange', 'Grape'], correctAnswer: 'Apple', audioText: 'Apple. An apple is a red fruit.', explanation: 'An apple is often red!' },
        { id: 'k-l1-2', question: 'Listen and pick the right word:', options: ['Sun', 'Moon', 'Star', 'Cloud'], correctAnswer: 'Sun', audioText: 'Sun. The sun is bright and yellow.', explanation: 'The sun gives us light!' },
        { id: 'k-l1-3', question: 'Listen and pick the right word:', options: ['Book', 'Ball', 'Box', 'Bag'], correctAnswer: 'Ball', audioText: 'Ball. A ball is round and bouncy.', explanation: 'A ball is round!' },
        { id: 'k-l1-4', question: 'Listen and pick the right word:', options: ['Hat', 'Shoe', 'Shirt', 'Sock'], correctAnswer: 'Hat', audioText: 'Hat. We wear a hat on our head.', explanation: 'We wear hats on our heads!' },
        { id: 'k-l1-5', question: 'Listen and pick the right word:', options: ['Tree', 'Flower', 'Grass', 'Bush'], correctAnswer: 'Tree', audioText: 'Tree. A tree is very tall and has leaves.', explanation: 'Trees are tall with leaves!' },
      ],
    },
  },
];

// ===================== TWEENS (8-12) =====================
export const TWEENS_LESSONS: Lesson[] = [
  {
    id: 'tweens-vocab-1',
    category: 'vocabulary',
    title: 'School Supplies',
    description: 'Learn words for things at school!',
    ageGroup: 'tweens',
    difficulty: 2,
    estimatedMinutes: 8,
    xpReward: 30,
    icon: '🎒',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'vocabulary',
      items: [
        { id: 't-v1-1', question: 'What do you write with?', options: ['Pencil', 'Ruler', 'Eraser', 'Scissors'], correctAnswer: 'Pencil', explanation: 'We use a pencil to write! ✏️', audioText: 'Pencil. We use a pencil to write in our notebooks.' },
        { id: 't-v1-2', question: 'What do you use to measure length?', options: ['Pen', 'Ruler', 'Glue', 'Crayon'], correctAnswer: 'Ruler', explanation: 'A ruler measures how long things are! 📏', audioText: 'Ruler. A ruler is used to measure length.' },
        { id: 't-v1-3', question: 'What removes pencil marks?', options: ['Marker', 'Eraser', 'Tape', 'Brush'], correctAnswer: 'Eraser', explanation: 'An eraser removes pencil marks!', audioText: 'Eraser. An eraser removes pencil marks from paper.' },
        { id: 't-v1-4', question: 'Where do you keep your books?', options: ['Pocket', 'Backpack', 'Shoe', 'Hat'], correctAnswer: 'Backpack', explanation: 'We carry our books in a backpack! 🎒', audioText: 'Backpack. We carry our books and supplies in a backpack.' },
        { id: 't-v1-5', question: 'What do you use to cut paper?', options: ['Scissors', 'Pen', 'Stapler', 'Tape'], correctAnswer: 'Scissors', explanation: 'Scissors are used to cut paper! ✂️', audioText: 'Scissors. Scissors are used to cut paper.' },
      ],
    },
  },
  {
    id: 'tweens-grammar-1',
    category: 'grammar',
    title: 'Present Tense',
    description: 'Master the present tense verbs!',
    ageGroup: 'tweens',
    difficulty: 2,
    estimatedMinutes: 10,
    xpReward: 35,
    icon: '📐',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'grammar',
      items: [
        { id: 't-g1-1', question: 'She ___ to school every day.', options: ['go', 'goes', 'going', 'went'], correctAnswer: 'goes', explanation: 'With "she/he/it", we add -es to "go" → "goes"', audioText: 'She goes to school every day.' },
        { id: 't-g1-2', question: 'They ___ soccer after school.', options: ['plays', 'play', 'playing', 'played'], correctAnswer: 'play', explanation: 'With "they", we use the base form "play"', audioText: 'They play soccer after school.' },
        { id: 't-g1-3', question: 'He ___ his homework before dinner.', options: ['do', 'does', 'doing', 'did'], correctAnswer: 'does', explanation: 'With "he", we use "does" not "do"', audioText: 'He does his homework before dinner.' },
        { id: 't-g1-4', question: 'I ___ English every day.', options: ['studies', 'study', 'studying', 'studied'], correctAnswer: 'study', explanation: 'With "I", we use the base form "study"', audioText: 'I study English every day.' },
        { id: 't-g1-5', question: 'The cat ___ on the sofa.', options: ['sit', 'sits', 'sitting', 'sat'], correctAnswer: 'sits', explanation: 'With "the cat" (it), we add -s to "sit" → "sits"', audioText: 'The cat sits on the sofa.' },
      ],
    },
  },
  {
    id: 'tweens-pronunciation-1',
    category: 'pronunciation',
    title: 'Tongue Twisters',
    description: 'Fun pronunciation challenges!',
    ageGroup: 'tweens',
    difficulty: 2,
    estimatedMinutes: 8,
    xpReward: 30,
    icon: '😛',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'pronunciation',
      items: [
        { id: 't-p1-1', question: 'Say: "She sells seashells"', correctAnswer: 'She sells seashells', audioText: 'She sells seashells by the seashore.' },
        { id: 't-p1-2', question: 'Say: "Red lorry, yellow lorry"', correctAnswer: 'Red lorry yellow lorry', audioText: 'Red lorry, yellow lorry.' },
        { id: 't-p1-3', question: 'Say: "How much wood would a woodchuck chuck"', correctAnswer: 'How much wood would a woodchuck chuck', audioText: 'How much wood would a woodchuck chuck?' },
        { id: 't-p1-4', question: 'Say: "Peter Piper picked a peck"', correctAnswer: 'Peter Piper picked a peck', audioText: 'Peter Piper picked a peck of pickled peppers.' },
        { id: 't-p1-5', question: 'Say: "Unique New York"', correctAnswer: 'Unique New York', audioText: 'Unique New York, you know you need unique New York.' },
      ],
    },
  },
  {
    id: 'tweens-reading-1',
    category: 'reading',
    title: 'Short Stories',
    description: 'Read and understand short passages!',
    ageGroup: 'tweens',
    difficulty: 2,
    estimatedMinutes: 10,
    xpReward: 35,
    icon: '📖',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'reading',
      items: [
        { id: 't-r1-1', question: '"Tom has a dog named Max. Max likes to play in the park." What is the dog\'s name?', options: ['Tom', 'Max', 'Park', 'Dog'], correctAnswer: 'Max', explanation: 'The story says the dog is named Max!', audioText: 'Tom has a dog named Max. Max likes to play in the park.' },
        { id: 't-r1-2', question: '"Sara wakes up at 7 AM. She eats breakfast and goes to school." When does Sara wake up?', options: ['6 AM', '7 AM', '8 AM', '9 AM'], correctAnswer: '7 AM', explanation: 'Sara wakes up at 7 AM!', audioText: 'Sara wakes up at 7 AM. She eats breakfast and goes to school.' },
        { id: 't-r1-3', question: '"The weather is sunny. The children go to the beach." Where do the children go?', options: ['Park', 'School', 'Beach', 'Home'], correctAnswer: 'Beach', explanation: 'The children go to the beach because it\'s sunny!', audioText: 'The weather is sunny. The children go to the beach.' },
        { id: 't-r1-4', question: '"My favorite season is winter. I love playing in the snow." What season does the writer like?', options: ['Spring', 'Summer', 'Fall', 'Winter'], correctAnswer: 'Winter', explanation: 'The writer\'s favorite season is winter!', audioText: 'My favorite season is winter. I love playing in the snow.' },
        { id: 't-r1-5', question: '"The library has many books. You can borrow them for free." What can you do at the library?', options: ['Buy books', 'Borrow books', 'Sell books', 'Write books'], correctAnswer: 'Borrow books', explanation: 'You can borrow books for free at the library!', audioText: 'The library has many books. You can borrow them for free.' },
      ],
    },
  },
  {
    id: 'tweens-listening-1',
    category: 'listening',
    title: 'Daily Routines',
    description: 'Listen to daily routine descriptions!',
    ageGroup: 'tweens',
    difficulty: 2,
    estimatedMinutes: 8,
    xpReward: 30,
    icon: '⏰',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'listening',
      items: [
        { id: 't-l1-1', question: 'Listen: What does the person do first in the morning?', options: ['Eat breakfast', 'Brush teeth', 'Wake up', 'Get dressed'], correctAnswer: 'Wake up', audioText: 'Every morning, I wake up at 7 o\'clock. Then I brush my teeth and eat breakfast.', explanation: 'The first thing is waking up!' },
        { id: 't-l1-2', question: 'Listen: Where does the person go after breakfast?', options: ['Park', 'School', 'Store', 'Home'], correctAnswer: 'School', audioText: 'After breakfast, I take the bus to school. I arrive at school at 8 o\'clock.', explanation: 'After breakfast, the person goes to school!' },
        { id: 't-l1-3', question: 'Listen: What time does lunch happen?', options: ['11 AM', '12 PM', '1 PM', '2 PM'], correctAnswer: '12 PM', audioText: 'At twelve o\'clock, we have lunch in the cafeteria. I usually eat a sandwich.', explanation: 'Lunch is at 12 PM!' },
        { id: 't-l1-4', question: 'Listen: What does the person do after school?', options: ['Sleep', 'Homework', 'Cook', 'Shop'], correctAnswer: 'Homework', audioText: 'After school, I go home and do my homework. Then I play with my friends.', explanation: 'The person does homework after school!' },
        { id: 't-l1-5', question: 'Listen: What time does the person go to bed?', options: ['8 PM', '9 PM', '10 PM', '11 PM'], correctAnswer: '9 PM', audioText: 'I go to bed at nine o\'clock. Before sleeping, I read a book for thirty minutes.', explanation: 'Bedtime is at 9 PM!' },
      ],
    },
  },
];

// ===================== TEENS (13-17) =====================
export const TEENS_LESSONS: Lesson[] = [
  {
    id: 'teens-vocab-1',
    category: 'vocabulary',
    title: 'Technology Terms',
    description: 'Learn essential tech vocabulary!',
    ageGroup: 'teens',
    difficulty: 3,
    estimatedMinutes: 10,
    xpReward: 40,
    icon: '💻',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'vocabulary',
      items: [
        { id: 'te-v1-1', question: 'A program that protects your computer from viruses is called:', options: ['Browser', 'Antivirus', 'Firewall', 'Database'], correctAnswer: 'Antivirus', explanation: 'Antivirus software protects against malicious programs.', audioText: 'Antivirus. An antivirus is a program that protects your computer from viruses and malware.' },
        { id: 'te-v1-2', question: 'The process of finding and fixing errors in code is called:', options: ['Coding', 'Compiling', 'Debugging', 'Testing'], correctAnswer: 'Debugging', explanation: 'Debugging means finding and fixing errors (bugs) in code.', audioText: 'Debugging. Debugging is the process of finding and fixing errors in computer code.' },
        { id: 'te-v1-3', question: 'What does "upload" mean?', options: ['Download from internet', 'Send to internet', 'Delete from computer', 'Save on computer'], correctAnswer: 'Send to internet', explanation: 'Upload means sending data from your device to the internet.', audioText: 'Upload means to send data or files from your device to the internet or a server.' },
        { id: 'te-v1-4', question: '"Bandwidth" refers to:', options: ['Screen size', 'Data transfer speed', 'Storage space', 'Battery life'], correctAnswer: 'Data transfer speed', explanation: 'Bandwidth is the maximum rate of data transfer across a network.', audioText: 'Bandwidth refers to the maximum rate of data transfer across a network connection.' },
        { id: 'te-v1-5', question: 'What is "cloud storage"?', options: ['A USB drive', 'Storage in the sky', 'Online remote storage', 'Phone memory'], correctAnswer: 'Online remote storage', explanation: 'Cloud storage is storing data on remote servers accessed via the internet.', audioText: 'Cloud storage is a service where data is stored on remote servers and accessed through the internet.' },
      ],
    },
  },
  {
    id: 'teens-grammar-1',
    category: 'grammar',
    title: 'Conditionals',
    description: 'Master if-then sentences!',
    ageGroup: 'teens',
    difficulty: 3,
    estimatedMinutes: 12,
    xpReward: 45,
    icon: '🔀',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'grammar',
      items: [
        { id: 'te-g1-1', question: 'If it ___ tomorrow, we will cancel the trip.', options: ['rains', 'will rain', 'rained', 'raining'], correctAnswer: 'rains', explanation: 'First conditional: If + present simple, will + base verb', audioText: 'If it rains tomorrow, we will cancel the trip. This is a first conditional sentence.' },
        { id: 'te-g1-2', question: 'If I ___ rich, I would travel the world.', options: ['am', 'were', 'was', 'be'], correctAnswer: 'were', explanation: 'Second conditional: If + past simple (were), would + base verb', audioText: 'If I were rich, I would travel the world. This is a second conditional sentence.' },
        { id: 'te-g1-3', question: 'She would have passed if she ___ harder.', options: ['studies', 'studied', 'had studied', 'would study'], correctAnswer: 'had studied', explanation: 'Third conditional: If + past perfect, would have + past participle', audioText: 'She would have passed if she had studied harder. This is a third conditional sentence.' },
        { id: 'te-g1-4', question: 'If you heat water to 100°C, it ___.', options: ['boils', 'will boil', 'would boil', 'boiled'], correctAnswer: 'boils', explanation: 'Zero conditional: If + present simple, present simple (facts)', audioText: 'If you heat water to 100 degrees Celsius, it boils. This is a zero conditional for facts.' },
        { id: 'te-g1-5', question: 'Unless you ___ now, you\'ll miss the bus.', options: ['leave', 'left', 'will leave', 'leaving'], correctAnswer: 'leave', explanation: '"Unless" means "if not". Unless + present simple', audioText: 'Unless you leave now, you will miss the bus. Unless means if not.' },
      ],
    },
  },
  {
    id: 'teens-pronunciation-1',
    category: 'pronunciation',
    title: 'Minimal Pairs',
    description: 'Master tricky sound differences!',
    ageGroup: 'teens',
    difficulty: 3,
    estimatedMinutes: 10,
    xpReward: 40,
    icon: '🎵',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'pronunciation',
      items: [
        { id: 'te-p1-1', question: 'Say: "Ship" (not "Sheep")', correctAnswer: 'Ship', audioText: 'Ship. Be careful: Ship has a short "i" sound, while Sheep has a long "ee" sound.' },
        { id: 'te-p1-2', question: 'Say: "Think" (th sound)', correctAnswer: 'Think', audioText: 'Think. Put your tongue between your teeth to make the "th" sound.' },
        { id: 'te-p1-3', question: 'Say: "Beach" (not "Bitch")', correctAnswer: 'Beach', audioText: 'Beach. Make sure to use the long "ee" sound in beach.' },
        { id: 'te-p1-4', question: 'Say: "World" (rl sound)', correctAnswer: 'World', audioText: 'World. The combination of r and l can be challenging. Practice slowly.' },
        { id: 'te-p1-5', question: 'Say: "Comfortable" (3 syllables)', correctAnswer: 'Comfortable', audioText: 'Comfortable. In natural speech, this word is often pronounced with three syllables: comf-ter-ble.' },
      ],
    },
  },
  {
    id: 'teens-reading-1',
    category: 'reading',
    title: 'News Articles',
    description: 'Read and comprehend news!',
    ageGroup: 'teens',
    difficulty: 3,
    estimatedMinutes: 12,
    xpReward: 45,
    icon: '📰',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'reading',
      items: [
        { id: 'te-r1-1', question: '"Scientists have discovered a new species of deep-sea fish. The fish can produce its own light." What makes this fish special?', options: ['It\'s very big', 'It produces light', 'It lives on land', 'It can fly'], correctAnswer: 'It produces light', audioText: 'Scientists have discovered a new species of deep sea fish that can produce its own light.', explanation: 'The fish is bioluminescent — it can produce its own light!' },
        { id: 'te-r1-2', question: '"The school introduced a new recycling program. Students are encouraged to separate plastic, paper, and glass." What should students separate?', options: ['Food and drinks', 'Plastic, paper, and glass', 'Books and bags', 'Clothes and shoes'], correctAnswer: 'Plastic, paper, and glass', audioText: 'The school introduced a new recycling program where students separate plastic, paper, and glass.' },
        { id: 'te-r1-3', question: '"Due to heavy rainfall, several roads have been closed. Authorities advise residents to stay indoors." What caused the road closures?', options: ['Snow', 'Heavy rainfall', 'Construction', 'An accident'], correctAnswer: 'Heavy rainfall', audioText: 'Due to heavy rainfall, several roads have been closed and authorities advise staying indoors.' },
        { id: 'te-r1-4', question: '"A local teen won the national spelling bee championship. She practiced for two hours daily for a year." How long did she practice each day?', options: ['One hour', 'Two hours', 'Three hours', 'Four hours'], correctAnswer: 'Two hours', audioText: 'A local teen won the national spelling bee after practicing two hours daily for a year.' },
        { id: 'te-r1-5', question: '"The museum will extend its opening hours during the summer holidays." What change is the museum making?', options: ['Closing down', 'Longer hours', 'Higher prices', 'Moving location'], correctAnswer: 'Longer hours', audioText: 'The museum will extend its opening hours during the summer holidays.' },
      ],
    },
  },
  {
    id: 'teens-listening-1',
    category: 'listening',
    title: 'Podcast Clips',
    description: 'Listen to short podcast segments!',
    ageGroup: 'teens',
    difficulty: 3,
    estimatedMinutes: 10,
    xpReward: 40,
    icon: '🎧',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'listening',
      items: [
        { id: 'te-l1-1', question: 'Listen: What is the speaker\'s main topic?', options: ['Sports', 'Climate change', 'Fashion', 'Music'], correctAnswer: 'Climate change', audioText: 'Today, I want to talk about climate change and how it affects our daily lives. Rising temperatures are causing more extreme weather events around the world.', explanation: 'The speaker is discussing climate change.' },
        { id: 'te-l1-2', question: 'Listen: What does the speaker recommend?', options: ['Read more books', 'Exercise daily', 'Save water', 'Sleep early'], correctAnswer: 'Read more books', audioText: 'My number one tip for improving your English is to read more books. Reading exposes you to new vocabulary and sentence structures naturally.', explanation: 'The speaker recommends reading more books.' },
        { id: 'te-l1-3', question: 'Listen: What problem does the speaker describe?', options: ['Pollution', 'Bullying', 'Screen time', 'Traffic'], correctAnswer: 'Screen time', audioText: 'Many teenagers spend over six hours a day looking at screens. This excessive screen time can affect sleep quality and mental health.', explanation: 'The speaker discusses excessive screen time.' },
        { id: 'te-l1-4', question: 'Listen: What subject is the speaker passionate about?', options: ['Math', 'Art', 'Space exploration', 'Cooking'], correctAnswer: 'Space exploration', audioText: 'I have always been fascinated by space exploration. The idea that humans might one day live on Mars is incredibly exciting to me.', explanation: 'The speaker is passionate about space exploration.' },
        { id: 'te-l1-5', question: 'Listen: What is the speaker\'s advice for stress?', options: ['Watch TV', 'Meditate', 'Eat more', 'Play games'], correctAnswer: 'Meditate', audioText: 'When you feel stressed, try meditation. Just five minutes of deep breathing and mindfulness can significantly reduce your stress levels.', explanation: 'The speaker recommends meditation for stress relief.' },
      ],
    },
  },
];

// ===================== ADULTS (18+) =====================
export const ADULTS_LESSONS: Lesson[] = [
  {
    id: 'adults-vocab-1',
    category: 'vocabulary',
    title: 'Business English',
    description: 'Essential corporate vocabulary!',
    ageGroup: 'adults',
    difficulty: 4,
    estimatedMinutes: 15,
    xpReward: 50,
    icon: '💼',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'vocabulary',
      items: [
        { id: 'a-v1-1', question: 'A formal meeting to discuss business is called:', options: ['Party', 'Conference', 'Picnic', 'Festival'], correctAnswer: 'Conference', explanation: 'A conference is a formal meeting for discussion or consultation.', audioText: 'Conference. A conference is a formal meeting where people discuss important business matters.' },
        { id: 'a-v1-2', question: '"To delegate" means to:', options: ['Cancel a task', 'Assign responsibility to others', 'Complete alone', 'Postpone'], correctAnswer: 'Assign responsibility to others', explanation: 'To delegate means to entrust a task to another person.', audioText: 'To delegate means to assign responsibility or authority to another person.' },
        { id: 'a-v1-3', question: 'A "deadline" is:', options: ['A fine', 'A meeting', 'A time limit', 'A contract'], correctAnswer: 'A time limit', explanation: 'A deadline is the latest time by which something must be completed.', audioText: 'A deadline is the latest time or date by which something must be completed.' },
        { id: 'a-v1-4', question: '"ROI" stands for:', options: ['Rate of Interest', 'Return on Investment', 'Review of Information', 'Report on Income'], correctAnswer: 'Return on Investment', explanation: 'ROI measures the profitability of an investment.', audioText: 'ROI stands for Return on Investment. It measures the profitability of an investment.' },
        { id: 'a-v1-5', question: '"To brainstorm" means:', options: ['To argue', 'To generate ideas collectively', 'To make a decision', 'To write a report'], correctAnswer: 'To generate ideas collectively', explanation: 'Brainstorming is a group creativity technique for generating ideas.', audioText: 'To brainstorm means to generate ideas collectively through spontaneous group discussion.' },
      ],
    },
  },
  {
    id: 'adults-grammar-1',
    category: 'grammar',
    title: 'Advanced Tenses',
    description: 'Perfect your tense usage!',
    ageGroup: 'adults',
    difficulty: 4,
    estimatedMinutes: 15,
    xpReward: 50,
    icon: '⚙️',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'grammar',
      items: [
        { id: 'a-g1-1', question: 'By next year, I ___ here for a decade.', options: ['will work', 'will have been working', 'am working', 'have worked'], correctAnswer: 'will have been working', explanation: 'Future perfect continuous: will have been + verb-ing (duration up to a future point)', audioText: 'By next year, I will have been working here for a decade. This is the future perfect continuous tense.' },
        { id: 'a-g1-2', question: 'The report ___ by the time you arrive.', options: ['will complete', 'will be completed', 'will have been completed', 'completes'], correctAnswer: 'will have been completed', explanation: 'Future perfect passive: will have been + past participle', audioText: 'The report will have been completed by the time you arrive. This is the future perfect passive.' },
        { id: 'a-g1-3', question: 'She ___ the proposal when her boss called.', options: ['was writing', 'wrote', 'had been writing', 'has written'], correctAnswer: 'had been writing', explanation: 'Past perfect continuous: had been + verb-ing (action in progress before another past action)', audioText: 'She had been writing the proposal when her boss called. Past perfect continuous shows an ongoing past action before another past event.' },
        { id: 'a-g1-4', question: 'I wish I ___ more time to prepare.', options: ['have', 'had', 'will have', 'having'], correctAnswer: 'had', explanation: 'Wish + past simple expresses a present unreal situation', audioText: 'I wish I had more time to prepare. We use wish plus past simple to express unreal present situations.' },
        { id: 'a-g1-5', question: 'Not until the meeting ended ___ the real problem.', options: ['we understood', 'did we understand', 'we did understand', 'understood we'], correctAnswer: 'did we understand', explanation: 'Inversion after negative adverbials: Not until... did + subject + verb', audioText: 'Not until the meeting ended did we understand the real problem. This uses subject-verb inversion after a negative adverbial.' },
      ],
    },
  },
  {
    id: 'adults-pronunciation-1',
    category: 'pronunciation',
    title: 'Professional Speech',
    description: 'Sound professional and confident!',
    ageGroup: 'adults',
    difficulty: 4,
    estimatedMinutes: 12,
    xpReward: 45,
    icon: '🎤',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'pronunciation',
      items: [
        { id: 'a-p1-1', question: 'Say: "I\'d like to schedule a meeting"', correctAnswer: 'I would like to schedule a meeting', audioText: 'I would like to schedule a meeting. Speak clearly and confidently.' },
        { id: 'a-p1-2', question: 'Say: "Could you elaborate on that point?"', correctAnswer: 'Could you elaborate on that point', audioText: 'Could you elaborate on that point? This is a polite way to ask for more details.' },
        { id: 'a-p1-3', question: 'Say: "The quarterly results exceeded expectations"', correctAnswer: 'The quarterly results exceeded expectations', audioText: 'The quarterly results exceeded expectations. Note the stress on "exceeded" and "expectations".' },
        { id: 'a-p1-4', question: 'Say: "We should prioritize sustainability"', correctAnswer: 'We should prioritize sustainability', audioText: 'We should prioritize sustainability. The stress falls on the third syllable of "sustainability".' },
        { id: 'a-p1-5', question: 'Say: "I appreciate your comprehensive analysis"', correctAnswer: 'I appreciate your comprehensive analysis', audioText: 'I appreciate your comprehensive analysis. This is a formal way to thank someone for thorough work.' },
      ],
    },
  },
  {
    id: 'adults-reading-1',
    category: 'reading',
    title: 'Business Reports',
    description: 'Understand professional documents!',
    ageGroup: 'adults',
    difficulty: 4,
    estimatedMinutes: 15,
    xpReward: 50,
    icon: '📊',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'reading',
      items: [
        { id: 'a-r1-1', question: '"The company reported a 15% increase in revenue compared to the previous quarter, primarily driven by expansion into Asian markets." What drove the revenue increase?', options: ['Cost cutting', 'Asian market expansion', 'New products', 'Layoffs'], correctAnswer: 'Asian market expansion', audioText: 'The company reported a fifteen percent increase in revenue, primarily driven by expansion into Asian markets.' },
        { id: 'a-r1-2', question: '"Stakeholders expressed concerns about the sustainability of current growth rates, citing increased competition and regulatory challenges." What are stakeholders worried about?', options: ['Employee satisfaction', 'Growth sustainability', 'Office space', 'Technology'], correctAnswer: 'Growth sustainability', audioText: 'Stakeholders expressed concerns about the sustainability of current growth rates.' },
        { id: 'a-r1-3', question: '"The merger will be subject to regulatory approval and is expected to close by Q3." When is the merger expected to close?', options: ['Q1', 'Q2', 'Q3', 'Q4'], correctAnswer: 'Q3', audioText: 'The merger will be subject to regulatory approval and is expected to close by Q3.' },
        { id: 'a-r1-4', question: '"Employee retention rates have improved by 20% following the implementation of flexible work arrangements." What improved retention?', options: ['Higher salaries', 'Flexible work', 'Better offices', 'More holidays'], correctAnswer: 'Flexible work', audioText: 'Employee retention rates improved by twenty percent following the implementation of flexible work arrangements.' },
        { id: 'a-r1-5', question: '"The board unanimously approved the restructuring plan, which aims to streamline operations and reduce overhead costs." What did the board approve?', options: ['Expansion plan', 'Hiring plan', 'Restructuring plan', 'Marketing plan'], correctAnswer: 'Restructuring plan', audioText: 'The board unanimously approved the restructuring plan to streamline operations and reduce costs.' },
      ],
    },
  },
  {
    id: 'adults-listening-1',
    category: 'listening',
    title: 'TED Talk Snippets',
    description: 'Listen to inspiring talks!',
    ageGroup: 'adults',
    difficulty: 4,
    estimatedMinutes: 12,
    xpReward: 45,
    icon: '🎙️',
    isLocked: false,
    isCompleted: false,
    content: {
      type: 'listening',
      items: [
        { id: 'a-l1-1', question: 'Listen: What is the main message?', options: ['Work harder', 'Embrace failure', 'Save money', 'Sleep more'], correctAnswer: 'Embrace failure', audioText: 'The most successful people in the world have one thing in common: they embrace failure. Every setback is an opportunity to learn and grow stronger.', explanation: 'The speaker encourages embracing failure as a path to success.' },
        { id: 'a-l1-2', question: 'Listen: What does the speaker argue about leadership?', options: ['It\'s about power', 'It\'s about empathy', 'It\'s about money', 'It\'s about age'], correctAnswer: 'It\'s about empathy', audioText: 'True leadership is not about having power over others. It is fundamentally about empathy, about understanding the needs and aspirations of the people you serve.', explanation: 'The speaker argues that leadership is fundamentally about empathy.' },
        { id: 'a-l1-3', question: 'Listen: What does the speaker say about habits?', options: ['They\'re impossible to change', 'Small habits compound', 'Only big changes matter', 'Habits don\'t matter'], correctAnswer: 'Small habits compound', audioText: 'Small habits might seem insignificant on their own, but they compound over time. A one percent improvement every day leads to remarkable results after a year.', explanation: 'Small habits compound over time for remarkable results.' },
        { id: 'a-l1-4', question: 'Listen: What is the speaker\'s view on innovation?', options: ['It requires big budgets', 'It comes from constraints', 'Only experts innovate', 'It\'s overrated'], correctAnswer: 'It comes from constraints', audioText: 'Contrary to popular belief, innovation does not require unlimited resources. Some of the most brilliant innovations have emerged from constraints and limitations.', explanation: 'Innovation often emerges from constraints, not unlimited resources.' },
        { id: 'a-l1-5', question: 'Listen: What does the speaker say about communication?', options: ['Speak louder', 'Listen more', 'Write more emails', 'Avoid conflict'], correctAnswer: 'Listen more', audioText: 'The single most important skill in communication is not speaking — it is listening. When we truly listen to others, we build trust, deepen understanding, and create meaningful connections.', explanation: 'Listening is the most important communication skill.' },
      ],
    },
  },
];

// ===================== CONVERSATION TOPICS =====================
export const CONVERSATION_TOPICS: ConversationTopic[] = [
  // Kids
  { id: 'conv-kids-1', title: 'My Favorite Toy', description: 'Talk about your favorite toy!', ageGroup: 'kids', difficulty: 1, starterPrompt: 'Hi! Tell me about your favorite toy. What is it? What color is it?', suggestedResponses: ['My favorite toy is...', 'It is a...', 'I like to play with...'] },
  { id: 'conv-kids-2', title: 'What I Eat', description: 'Talk about food you like!', ageGroup: 'kids', difficulty: 1, starterPrompt: 'What is your favorite food? Do you like fruits?', suggestedResponses: ['I like to eat...', 'My favorite food is...', 'I do not like...'] },
  // Tweens
  { id: 'conv-tweens-1', title: 'My Hobbies', description: 'Share your hobbies and interests!', ageGroup: 'tweens', difficulty: 2, starterPrompt: 'Hey! What do you like to do in your free time? Do you have any hobbies?', suggestedResponses: ['In my free time, I like to...', 'My hobby is...', 'I enjoy...'] },
  { id: 'conv-tweens-2', title: 'Dream Vacation', description: 'Where would you love to visit?', ageGroup: 'tweens', difficulty: 2, starterPrompt: 'If you could travel anywhere in the world, where would you go? Why?', suggestedResponses: ['I would love to visit...', 'I want to go to... because...', 'My dream vacation is...'] },
  // Teens
  { id: 'conv-teens-1', title: 'Social Media', description: 'Discuss social media usage!', ageGroup: 'teens', difficulty: 3, starterPrompt: 'What do you think about social media? Do you think it has more advantages or disadvantages?', suggestedResponses: ['I think social media is...', 'On one hand...', 'However, I also believe...'] },
  { id: 'conv-teens-2', title: 'Future Career', description: 'Talk about career goals!', ageGroup: 'teens', difficulty: 3, starterPrompt: 'What kind of career are you interested in? What skills do you think you need?', suggestedResponses: ['I am interested in becoming...', 'I think I need skills like...', 'My dream job is...'] },
  // Adults
  { id: 'conv-adults-1', title: 'Work-Life Balance', description: 'Discuss balancing career and personal life!', ageGroup: 'adults', difficulty: 4, starterPrompt: 'How do you maintain a healthy work-life balance? What strategies work for you?', suggestedResponses: ['I believe work-life balance is important because...', 'One strategy I use is...', 'In my experience...'] },
  { id: 'conv-adults-2', title: 'Global Issues', description: 'Discuss current world challenges!', ageGroup: 'adults', difficulty: 4, starterPrompt: 'What do you think is the most pressing global issue today? How can individuals contribute to solutions?', suggestedResponses: ['I believe the most pressing issue is...', 'Individuals can contribute by...', 'From my perspective...'] },
];

export function getLessonsForAgeGroup(ageGroup: string): Lesson[] {
  switch (ageGroup) {
    case 'kids': return KIDS_LESSONS;
    case 'tweens': return TWEENS_LESSONS;
    case 'teens': return TEENS_LESSONS;
    case 'adults': return ADULTS_LESSONS;
    default: return KIDS_LESSONS;
  }
}

export function getConversationTopicsForAgeGroup(ageGroup: string): ConversationTopic[] {
  return CONVERSATION_TOPICS.filter(topic => topic.ageGroup === ageGroup);
}
