export const questions = [
  {
    id: 1,
    text: "In Deutschland dürfen Menschen offen etwas gegen die Regierung sagen, weil ...?",
    translation: "در آلمان مردم مجازند بدون واهمه نظرات خود را بر علیه دولت این کشور ابراز کنند، زیرا که",
    image: null,
    answers: [
      { id: 1, text: "hier Religionsfreiheit gilt", translation: "در اینجا آزادی مذهب حکمفرماست", correct: true },
      { id: 2, text: "die Menschen Steuern zahlen", translation: "مردم مالیات پرداخت میکنند", correct: false },
      { id: 3, text: "die Menschen das Wahlrecht haben", translation: "مردم از حق شرکت در انتخابات برخوردارند", correct: false },
      { id: 4, text: "hier Meinungsfreiheit gilt, translation", translation: "در اینجا آزادی بیان حکمفرماست", correct: false }
    ]
  },
  {
    id: 2,
    text: "Deutschland ist ein Rechtsstaat. Was ist damit gemeint?",
    translation: "آلمان کشوری است قانونمند. منظور از این جمله چیست؟",
    image: null,
    answers: [
      { id: 1, text: "Alle Einwohner / Einwohnerinnen und der Staat müssen sich an die Gesetze halten", translation: "همه ساکنین این کشور و دولت موظف به رعایت قانون میباشند", correct: true },
      { id: 2, text: "Der Staat muss sich nicht an die Gesetze halten", translation: "دولت ملزم به رعایت قانون نمیباشد", correct: false },
      { id: 3, text: "Nur Deutsche müssen die Gesetze befolgen", translation: "صرفاً آلمانیها ملزم به رعایت قانون میباشند", correct: false },
      { id: 4, text: "Die Gerichte machen die Gesetze", translation: "دادگاهها قوانین کشور را وضع میکنند", correct: false }
    ]
  },
  {
    id: 3,
    text: "In Deutschland können Eltern bis zum 14. Lebensjahr ihres Kindes entscheiden, ob es in der Schule am ...",
    translation: "در کشور آلمان والدین می توانند تا 14 سالگی بچه شان تصمیم بگیرند : که آیا او در مدرسه در کلاس ... شرکت کند یا نه",
    image: null,
    answers: [
      { id: 1, text: "Geschichtsunterricht teilnimmt", translation: "تاریخ", correct: false },
      { id: 2, text: "Religionsunterricht teilnimmt", translation: "تعلیمات دینی", correct: true },
      { id: 3, text: "Politikunterricht teilnimmt", translation: "سیاست", correct: false },
      { id: 4, text: "Sprachunterricht teilnimmt", translation: "زبان", correct: false }
    ]
  },
];

export const getRandomQuestions = (count) => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};