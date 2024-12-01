/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/


  var styles = [{
    name: "Style 1",
    path: "pliki_css/page1.css"
  }, {
    name: "Style 2",
    path: "pliki_css/page2.css"
  }, {
    name: "Style 3",
    path: "pliki_css/page3.css"
  }];
  var current_index = 0;
  function updateStyles() {
    var head_link = document.getElementById("style-link");
    if (head_link) {
      head_link.href = styles[current_index].path;
    } else {
      var new_link = document.createElement("link");
      new_link.id = "style-link";
      new_link.rel = "stylesheet";
      new_link.href = styles[current_index].path;
      document.head.appendChild(new_link);
    }
    var container = document.getElementById("link_lab");
    if (!container) {
      console.error("Error!");
      return;
    }
    container.innerHTML = "";
    styles.forEach(function (style, index) {
      var button = document.createElement("button");
      button.textContent = style.name;
      button.classList.add("theme-button");
      if (index === current_index) {
        button.classList.add("active");
      }
      button.addEventListener("click", function () {
        if (index !== current_index) {
          console.log("Zmiana: ".concat(style.name));
          current_index = index;
          updateStyles();
        }
      });
      console.log("Dodawanie:", style.name);
      container.appendChild(button);
    });
    var buttons = container.getElementsByTagName('button');
    console.log("Utworzono: ".concat(buttons.length));
  }
  window.onload = function () {
    updateStyles();
  };
  /******/ })()
  ;