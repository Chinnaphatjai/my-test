const rotors = {
  I: "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
  II: "AJDKSIRUXBLHWTMCQGZNPYFVOE",
  III: "BDFHJLCPRTXVZNYEIWGAKMUSQO",
  IV: "ESOVPZJAYQUIRHXLNFTGKDCMWB",
  V: "VZBRGITYUPSDNHLXAWMJQOFECK"
};

const rotorList = Object.keys(rotors);

function populateRotorSelectors() {
  const selects = ['rotor1', 'rotor2', 'rotor3'];
  selects.forEach(id => {
    const select = document.getElementById(id);
    rotorList.forEach(rotor => {
      const option = document.createElement('option');
      option.value = rotor;
      option.textContent = rotor;
      select.appendChild(option);
    });
  });
}
populateRotorSelectors();

function rotateRotor(rotor) {
  return rotor.slice(1) + rotor[0];
}

function enigmaEncrypt(char, rotorSettings, positions) {
  let idx = char.charCodeAt(0) - 65;

  for (let i = 0; i < 3; i++) {
    const rotor = rotors[rotorSettings[i]];
    const pos = positions[i].charCodeAt(0) - 65;
    idx = (rotor[(idx + pos) % 26]).charCodeAt(0) - 65;
  }

  idx = 25 - idx;

  for (let i = 2; i >= 0; i--) {
    const rotor = rotors[rotorSettings[i]];
    const pos = positions[i].charCodeAt(0) - 65;
    idx = rotor.indexOf(String.fromCharCode((idx + 65))) - pos;
    if (idx < 0) idx += 26;
  }

  return String.fromCharCode(idx + 65);
}

function processText(text, mode) {
  const rotorSettings = [
    document.getElementById("rotor1").value,
    document.getElementById("rotor2").value,
    document.getElementById("rotor3").value
  ];

  let positions = document.getElementById("positions").value.toUpperCase().split("");
  if (positions.length !== 3 || !positions.every(p => /^[A-Z]$/.test(p))) {
    alert("ตำแหน่งต้องมี 3 ตัวอักษร A-Z");
    return "";
  }

  text = text.toUpperCase().replace(/[^A-Z]/g, "");
  let result = "";

  for (let i = 0; i < text.length; i++) {
    result += enigmaEncrypt(text[i], rotorSettings, positions);

    positions[2] = String.fromCharCode(((positions[2].charCodeAt(0) - 64) % 26) + 65);
    if (positions[2] === 'A') {
      positions[1] = String.fromCharCode(((positions[1].charCodeAt(0) - 64) % 26) + 65);
      if (positions[1] === 'A') {
        positions[0] = String.fromCharCode(((positions[0].charCodeAt(0) - 64) % 26) + 65);
      }
    }
  }

  return result;
}

function encrypt() {
  const text = document.getElementById("inputText").value;
  const result = processText(text, "encrypt");
  document.getElementById("outputText").value = result;
}

function decrypt() {
  encrypt();
}
