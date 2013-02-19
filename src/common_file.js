function summon_spirit_animal() {

	var animals = [
		'giraffe', 'cougar', 'tiger', 'nematoad', 'cat', 'snake', 'ferret',
		'elephant', 'aardvark', 'anteater', 'coyote', 'frog', 'whale'
	], word = animals[Math.floor(Math.random()*animals.length)];

	return ((word[0].match(/[aeiou]/)) ? 'an' : 'a') + ' '+ word;
}

module.exports = {
	get_spirit_animal: summon_spirit_animal,
	get_animal_name: require('sillyname')
};