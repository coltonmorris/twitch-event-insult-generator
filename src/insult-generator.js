let adjectives = ["ugly", "shitty", "smelly", "stupid", "retarded", "zit faced", "un-motivated", "lazy", "limp dick", "uneducated", "uptight","prude","rank", "fat", "overweight", "pompous", "ignorant",
generate_two_word_diss(["tampon", "shit", "dirt", "garbage", "scrap", "dick"], "eating")
]

let nouns = ["noob", "cuck", "douche canoe", "creep", "necrophiliac", "pedophile", "bitch", "fucker", "shit hole", "cunt", "jabroni", "slut", "mongoloid", "invertabrate jelly", "jerk off", "asshole", "jackass", "virgin", "turd", "rectum",
generate_two_word_diss(["knuckle", "shit", "stupid", "poop", "meanie"], "head"),
generate_two_word_diss(["elephant", "dog", "goat", "cat", "hippopotamus", "raccoon"], "fucker")
]

function generate_two_word_diss(lst, last_word) {
  return lst[Math.floor(Math.random()*lst.length)] + " " + last_word
}

module.exports = function() {
  let adjective = adjectives[Math.floor(Math.random()*adjectives.length)]
  let noun = nouns[Math.floor(Math.random()*nouns.length)]
  return adjective + " " + noun
}
