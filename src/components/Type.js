import React, { useState, useEffect } from "react";

const TypingEffect = ({
  words,
  typingSpeed = 1,
  erasingSpeed = 1,
  delay = 1,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const word = words[currentWordIndex];
    let wordIndex = 0;
    let erase = false;

    const typeWord = () => {
      if (erase) {
        setCurrentWord(word.substring(0, wordIndex - 1));
      } else {
        setCurrentWord(word.substring(0, wordIndex + 1));
      }

      if (!erase && wordIndex === word.length) {
        erase = true;
        setIsTyping(false);
        setTimeout(() => {
          setIsTyping(true);
        }, 50000);
      }

      if (erase && wordIndex === 0) {
        erase = false;
        setCurrentWord("");
        setCurrentWordIndex((currentWordIndex + 1) % words.length);
      }

      wordIndex += erase ? -1 : 1;
    };

    const typingInterval = setInterval(
      typeWord,
      erase ? erasingSpeed : typingSpeed
    );

    return () => clearInterval(typingInterval);
  }, [currentWordIndex, words, typingSpeed, erasingSpeed, delay]);

  return <span>{currentWord}</span>;
};

export default TypingEffect;
