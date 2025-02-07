// تأكد من أن الصفحة قد تم تحميلها بالكامل
document.addEventListener("DOMContentLoaded", function () {
  const bashar = document.getElementById("bashar");
  const shoe = document.getElementById("shoe");
  const throwButton = document.getElementById("throwButton");
  const resultElement = document.getElementById("result");

  let basharPosition = 250; // الموضع الأفقي لبشار
  let shoePosition = -30; // الموضع الرأسي للحذاء
  let isShoeThrown = false;
  let attempts = 0;
  const maxAttempts = 5;

  // تحريك بشار يمينًا ويسارًا
  function moveBashar() {
    const direction = Math.random() > 0.5 ? 1 : -1; // 1 لليمين، -1 لليسار
    basharPosition += direction * 50; // تحريك بشار بمقدار 50 بكسل
    basharPosition = Math.max(0, Math.min(500, basharPosition)); // التأكد من أن بشار لا يخرج عن الحدود
    bashar.style.left = `${basharPosition}px`;
  }

  // رمي الحذاء
  function throwShoe() {
    if (isShoeThrown) return; // منع رمي الحذاء أكثر من مرة في نفس الوقت
    isShoeThrown = true;
    attempts++;
    shoePosition = 0; // إظهار الحذاء
    shoe.style.bottom = `${shoePosition}px`;

    // تحريك الحذاء للأعلى
    const shoeInterval = setInterval(() => {
      shoePosition += 5;
      shoe.style.bottom = `${shoePosition}px`;

      // التحقق من الاصطدام ببشار
      if (shoePosition >= 80 && shoePosition <= 100 && Math.abs(basharPosition - 250) < 50) {
        clearInterval(shoeInterval);
        resultElement.textContent = "أصبت بشار! 🎉";
        throwButton.disabled = true;
      }

      // إذا وصل الحذاء إلى الأعلى ولم يصب بشار
      if (shoePosition >= 400) {
        clearInterval(shoeInterval);
        isShoeThrown = false;
        shoePosition = -30;
        shoe.style.bottom = `${shoePosition}px`;

        if (attempts >= maxAttempts) {
          resultElement.textContent = "انتهت المحاولات! بشار فاز. ❌";
          throwButton.disabled = true;
        }
      }
    }, 20);
  }

  // تحريك بشار كل ثانية
  setInterval(moveBashar, 1000);

  // إضافة حدث النقر على زر رمي الحذاء
  throwButton.addEventListener("click", throwShoe);
});
