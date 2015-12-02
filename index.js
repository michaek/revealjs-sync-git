var exec = require('child_process').exec;
var fs = require('fs');


var listen = require('revealjs-listen');


var currentRef;
var refs = [];


function updateGit(ref, repository) {
	if (!ref || ref === currentRef) {
		return;
	}

	currentRef = ref;

	exec('git checkout -f '+currentRef, {cwd: repository}, function(err, stdout, stderr){
		if (!err) {
			console.log('Updated', repository, 'to', currentRef+'.');
		}
	});
}


function addGitRef(notes, x, y) {
	var match = notes.match(/git:([^\s\<]+)/);

	if (match) {
		var ref = match[1];
		var found = findCurrentRef(x, y);
		if (found.ref != ref) {
			refs.splice(found.index + 1, 0, [x, y, ref]);
		}
	}
}


function findCurrentRef(x, y) {
	var i, row, ref;

	for (i=refs.length-1; i>=0; i--) {
		row = refs[i];
		if (x > row[0] || x == row[0] && y >= row[1]) {
			ref = row[2];
			break;
		}
	}

	return { index: i, ref: ref };
}


module.exports = function(repository, host, port) {

	listen(function(data){
		var x = data.state.indexh;
		var y = data.state.indexv;

		if (data.notes) {
			addGitRef(data.notes, x, y);
		}

		var found = findCurrentRef(x, y);

		updateGit(found.ref, repository);
	}, host, port);

}
