function parseStory(rawStory) {
  let outputStory = [];

  let storySplit = rawStory.split(" ");
  for (let i = 0; i < storySplit.length; i++) {
    let storyObject = {};

    if (storySplit[i].includes("[a]")) {
      storyObject.word = storySplit[i].split("[a]")[0];
      storyObject.pos = "adjective";
    } else if (storySplit[i].includes("[v]")) {
      storyObject.word = storySplit[i].split("[v]")[0];
      storyObject.pos = "verb";
    } else if (storySplit[i].includes("[n]")) {
      storyObject.word = storySplit[i].split("[n]")[0];
      storyObject.pos = "noun";
    } else if (storySplit[i].includes(".")) {
      storyObject.word = ".";
    } else if (storySplit[i].includes("!")) {
      storyObject.word = "!";
    } else {
      storyObject.word = storySplit[i];
    }

    outputStory.push(storyObject);
  }

  return outputStory;
}

getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    const previewDiv = document.getElementsByClassName("madLibsPreview")[0];
    const editDiv = document.getElementsByClassName("madLibsEdit")[0];
    for (i = 0; i < processedStory.length; i++) {
      if (processedStory[i].pos) {
        const input = document.createElement("input");
        input.maxLength = "20";
        input.setAttribute("class", "democlass");
        const span = document.createElement("span");

        input.placeholder = processedStory[i].pos;
        span.innerText = "(" + processedStory[i].pos + ")";
        span.style.color = "#0000CD";
        previewDiv.appendChild(span);
        editDiv.appendChild(input);
        input.onkeyup = function (e) {
          span.innerText = input.value;
        };
        const inputs = document.getElementsByClassName("democlass"); // All buttons.
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].addEventListener("keydown", (e) => {
            if (i != inputs.length - 1 && e.code === "Enter")
              inputs[i + 1].focus();
            //inputs.style.backgroundColor = "black";
          });
        }
      } else {
        const span = document.createElement("span");
        const spantwo = document.createElement("span");
        span.innerText = processedStory[i].word;
        spantwo.innerText = processedStory[i].word;
        previewDiv.appendChild(span);
        editDiv.appendChild(spantwo);
      }
      const space = document.createElement("span");
      space.innerText = " ";
      const space2 = document.createElement("span");
      space2.innerText = " ";
      previewDiv.appendChild(space);
      editDiv.appendChild(space2);
    }
    console.log(processedStory);
  });

let footer = document.createElement("footer");
footer.setAttribute("id", "myFooter");
document.body.appendChild(footer);
let y = document.createElement("p");
y.setAttribute("class", "parag");
let t = document.createTextNode("MadLibz created by Mustafa&Yesim");
y.appendChild(t);
document.getElementById("myFooter").appendChild(y);
