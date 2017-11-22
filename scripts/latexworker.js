function prog2presentation(str) {
	return str.replace(/(XOR)|(\^)/ig, "⊕")
		.replace(/(\|\|)|(OR)/g, "∨")
		.replace(/!|(NOT)/ig, "¬")
		.replace(/(element)|(in)/ig, "∈")
		.replace(/(False)|\sF\s|(Bottom)/ig, "⊥")
		.replace(/(True)|\sT\s|(Top)/ig, "T")
		.replace(/(&&?)|(AND)/ig, "∧")
		.replace(/(<->)|(<=>)/ig, "↔")
		.replace(/(->)|(implies)|(=>)/gi, "→")
		.replace(/alpha/ig, "α")
		.replace(/beta/ig, "β")
		.replace(/gamma/g, "γ")
		.replace(/Gamma/ig, "Γ")
		.replace(/delta/g, "δ")
		.replace(/Delta/ig, "∆")
		.replace(/eps(ilon)?/ig, "ε")
		.replace(/zeta/ig, "ζ")
		.replace(/theta/g, "θ")
		.replace(/Theta/ig, "Θ")
		.replace(/lambda/ig, "λ")
		.replace(/(mu)|(micro)/ig, "μ")
		.replace(/xi/g, "ξ")
		.replace(/Xi/ig, "Ξ")
		.replace(/pi/g, "π")
		.replace(/Pi/ig, "Π")
		.replace(/sigma/g, "σ")
		.replace(/Sigma/ig, "Σ")
		.replace(/tau/ig, "τ")
		.replace(/phi/ig, "φ")
		.replace(/chi/ig, "χ")
		.replace(/\spsi/ig, "ψ")
		.replace(/omega/g, "ω")
		.replace(/Omega/ig, "Ω")
		.replace(/===/g, "≡")
		.replace(/\*/g, "×")
		.replace(/\//g, "÷")
		.replace(/>\s?=/g, "≥")
		.replace(/(<\s?=)|(=\s?<)/g, "≤")
		.replace(/sqrt\((.*?)\)/g, "√($1)")
		.replace(/floor\((.*?)\)/g, "└$1┘")
		.replace(/ceil\((.*?)\)/g, "┌$1┐")
		.replace(/{}/g, "∅")
		.replace(/infinity/g, "∞")
}

function prog2latex(str) {
	return str.replace(/(XOR)|(\^)/ig, "\\oplus")
		.replace(/(\|\|)|(OR)/g, "\\vee")
		.replace(/!\s?=/g, "\\neq")
		.replace(/\|=/g, "\\vDash")
		.replace(/!|(NOT)/ig, "\\neg ")
		.replace(/infinity/ig, "∞")
		.replace(/(element)|(in)/ig, "\\in")
		.replace(/(!\s?element)|(!\s?in)/ig, "\\notin")
		.replace(/{}/g, "\\emptyset")
		.replace(/(False)|\sF\s|(Bottom)/ig, "\\perp{}")
		.replace(/(True)|\sT\s|(Top)/ig, "\\top{}")
		.replace(/(&&?)|(AND)/ig, "\\wedge")
		.replace(/(<->)|(<=>)/ig, "\\leftrightarrow")
		.replace(/(->)|(implies)|(=>)/ig, "\\rightarrow")
		.replace(/alpha/ig, "\\alpha")
		.replace(/beta/ig, "\\beta")
		.replace(/(g)amma/ig, "\\$1amma")
		.replace(/(d)elta/ig, "\\$1elta")
		.replace(/eps(ilon)?/ig, "\\varepsilon")
		.replace(/zeta/ig, "\\zeta")
		.replace(/(t)heta/ig, "\\$1heta")
		.replace(/lambda/ig, "\\lambda")
		.replace(/(mu)|(micro)/ig, "\\mu")
		.replace(/(x)i/ig, "\\$1i")
		.replace(/(p)i/ig, "\\$1i")
		.replace(/(S)igma/ig, "\\$1igma")
		.replace(/tau/ig, "\\tau")
		.replace(/phi/ig, "\\varphi")
		.replace(/chi/ig, "\\chi")
		.replace(/\spsi/ig, "\\psi")
		.replace(/(O)mega/ig, "\\$1mega")
		.replace(/===/g, "\\equiv")
		.replace(/:=/g, "\\coloneqq")
		.replace(/\.\.\./g, "\\cdots")
		.replace(/\*/g, "\\times")
		.replace(/\//g, "\\div")
		.replace(/>\s?=/g, "\\geq")
		.replace(/(<\s?=)|(=\s?<)/g, "\\leq")
		.replace(/\[\[/g, "\\llbracket")
		.replace(/\]\]/g, "\\rrbracket")
		.replace(/%/g, "\\%")
		.replace(/#/g, "\\#")
		.replace(/:/g, "\\:")
		.replace(/\$/g, "\\$")
		.replace(/sqrt\((.*?)\)/ig, "\\sqrt{$1}")
		.replace(/floor\((.*?)\)/ig, "\\lfloor $1\\rfloor")
		.replace(/ceil\((.*?)\)/ig, "\\lceil $1\\rceil")
		.replace(/∞/g, "\\infty")
}

// courtesy of https://codereview.stackexchange.com/questions/45991/balanced-parentheses
function parenthesesAreBalanced(string) {
  var parentheses = "[]{}()",
    stack = [],
    i, character, bracePosition;

  for(i = 0; character = string[i]; i++) {
    bracePosition = parentheses.indexOf(character);

    if(bracePosition === -1) {
      continue;
    }

    if(bracePosition % 2 === 0) {
     	stack.push(bracePosition + 1); // push next expected brace position
    } else {
    	if(stack.pop() !== bracePosition) {
			return false;
		}
    }
  }

  return stack.length === 0;
}

function matchInArray(str, a) {
	for (var i = a.length - 1; i >= 0; i--) {
		if (str.indexOf(a[i]) != -1) return true;
	}
	return false;
}

function whatThePack(input) {
	var stmaryd = ["[[", "]]"];
	var mathtools = [":="];
	var amssyb = ["|="];
	var res = [];
	if (matchInArray(input, stmaryd)) res.push("stmaryd");
	if (matchInArray(input, mathtools)) res.push("mathtools");
	if (matchInArray(input, amssyb)) res.push("amssyb");
	return res;
}

function displayWarn(pres) {
	var warning = ["√", "[[", "]]", "└", "┌", "T", ":=", "|="];
	return matchInArray(pres, warning);
}

onmessage = function(e) {
  //console.log('Message received from main script');
  var res = {
  	id: e.data.id,
  	balanced: parenthesesAreBalanced(e.data.input),
  	display: prog2presentation(e.data.input),
  	latex: prog2latex(e.data.input),
  	packages: whatThePack(e.data.input),
  	warning: false,
  };
  res.warning = displayWarn(res.display);
  //console.log('Posting message back to main script');
  postMessage(res);
}