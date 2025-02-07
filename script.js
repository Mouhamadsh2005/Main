// تأكد من أن الصفحة قد تم تحميلها بالكامل
document.addEventListener("DOMContentLoaded", function () {
  let correctCount = 0;
  let wrongCount = 0;

  const questionElement = document.getElementById("question");
  const answersList = document.getElementById("answers");
  const resultElement = document.getElementById("result");
  const scoreElement = document.getElementById("score");
  const retryButton = document.getElementById("retry");

  // جلب البيانات من ملف JSON
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // عرض السؤال
      questionElement.textContent = data.question;

      // عرض الإجابات
      data.answers.forEach((answer) => {
        const li = document.createElement("li");
        li.textContent = answer;
        li.addEventListener("click", () => checkAnswer(answer, data.correctAnswer, li));
        answersList.appendChild(li);
      });
    })
    .catch((error) => console.error("حدث خطأ أثناء جلب البيانات:", error));

  // دالة للتحقق من الإجابة
  function checkAnswer(selectedAnswer, correctAnswer, clickedElement) {
    if (selectedAnswer === correctAnswer) {
      resultElement.textContent = "إجابة صحيحة! 🎉";
      resultElement.style.color = "green";
      clickedElement.classList.add("correct");
      correctCount++;
    } else {
      resultElement.textContent = "إجابة خاطئة! ❌";
      resultElement.style.color = "red";
      clickedElement.classList.add("wrong");
      wrongCount++;
    }

    // تحديث النتيجة
    scoreElement.textContent = `الإجابات الصحيحة: ${correctCount} | الإجابات الخاطئة: ${wrongCount}`;

    // تعطيل النقر على الإجابات بعد اختيار إجابة
    const answers = document.querySelectorAll("#answers li");
    answers.forEach((answer) => {
      answer.style.pointerEvents = "none";
    });

    // إظهار زر إعادة المحاولة
    retryButton.style.display = "block";
  }

  // إعادة المحاولة
  retryButton.addEventListener("click", () => {
    // إعادة تعيين النتيجة
    correctCount = 0;
    wrongCount = 0;
    scoreElement.textContent = `الإجابات الصحيحة: ${correctCount} | الإجابات الخاطئة: ${wrongCount}`;

    // إعادة تعيين النتيجة والرسالة
    resultElement.textContent = "";
    resultElement.style.color = "";

    // إعادة تعيين الإجابات
    const answers = document.querySelectorAll("#answers li");
    answers.forEach((answer) => {
      answer.style.pointerEvents = "auto";
      answer.classList.remove("correct", "wrong");
    });

    // إخفاء زر إعادة المحاولة
    retryButton.style.display = "none";
  });
});
