import test from "ava";
import parser from "..";

test('Emoji only', t => {
  const actual = parser.parse("😂🇬🇧");
  const expected = {
    text: "😂🇬🇧",
    emoji: [
      { character: "😂", indices: [0, 2] },
      { character: "🇬🇧", indices: [2, 6]}
    ]
  };

  t.deepEqual(actual, expected);
});

test('Emoji and text', t => {
  const actual = parser.parse("Hello! 😂 I live in the 🇬🇧");
  const expected = {
    text: "Hello! 😂 I live in the 🇬🇧",
    emoji: [
      { character: "😂", indices: [7, 9] },
      { character: "🇬🇧", indices: [24, 28]}
    ]
  };

  t.deepEqual(actual, expected);
});

test('Text only', t => {
  const actual = parser.parse("Hello world!");
  const expected = {
    text: "Hello world!",
    emoji: []
  };

  t.deepEqual(actual, expected);
});

test('Empty text', t => {
  const actual = parser.parse("");
  const expected = {
    text: "",
    emoji: []
  };

  t.deepEqual(actual, expected);
});

test('Emoji with skin tone modifiers', t => {
  const actual = parser.parse("\uD83D\uDC4D\uD83C\uDFFB");
  const expected = {
    text: "\uD83D\uDC4D\uD83C\uDFFB",
    emoji: [
      { character: "\uD83D\uDC4D\uD83C\uDFFB", indices: [0, 4] }
    ]
  };

  t.deepEqual(actual, expected);
});

test('Kiss sequence', t => {
  const actual = parser.parse("\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC8B\u200D\uD83D\uDC68");
  const expected = {
    text: "\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC8B\u200D\uD83D\uDC68",
    emoji: [
      { character: "\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC8B\u200D\uD83D\uDC68", indices: [0, 11] }
    ]
  };

  t.deepEqual(actual, expected);
});

test('Couple with heart sequence', t => {
  const actual = parser.parse("\uD83D\uDC68\u200D\u2764\uFE0F\u200D\uD83D\uDC68");
  const expected = {
    text: "\uD83D\uDC68\u200D\u2764\uFE0F\u200D\uD83D\uDC68",
    emoji: [
      { character: "\uD83D\uDC68\u200D\u2764\uFE0F\u200D\uD83D\uDC68", indices: [0, 8] }
    ]
  };

  t.deepEqual(actual, expected);
});
