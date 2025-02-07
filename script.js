// تأكد من أن الصفحة قد تم تحميلها بالكامل
document.addEventListener("DOMContentLoaded", function () {
  let correctCount = 0;
  let wrongCount = 0;

  // جلب البيانات من ملف JSON
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      // عرض السؤال
      document.getElementById("question").textContent = data.question;

      // عرض الإجابات
      const answersList = document.getElementById("answers");
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
    const resultElement = document.getElementById("result");
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

    // تحديث عدد الإجابات الصحيحة والخاطئة
    document.getElementById("correctCount").textContent = correctCount;
    document.getElementById("wrongCount").textContent = wrongCount;

    // تعطيل النقر على الإجابات بعد اختيار إجابة
    const answers = document.querySelectorAll("#answers li");
    answers.forEach((answer) => {
      answer.style.pointerEvents = "none";
    });
  }
});
