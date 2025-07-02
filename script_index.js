// حفظ أسماء المستخدمين في localStorage عند إنشاء حساب جديد
// التحقق من اسم المستخدم عند تسجيل الدخول

document.addEventListener('DOMContentLoaded', function () {
    // تسجيل الدخول
    const loginForm = document.querySelector('form');
    if (loginForm && document.getElementById('username')) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const found = users.find(user => user.username === username && user.password === password);
            if (found) {
                alert('تم تسجيل الدخول بنجاح');
                window.location.href = "home.html";
                localStorage.setItem('currentUser', JSON.stringify(found));
            } else {
                alert('اسم المستخدم أو كلمة المرور غير صحيحة. الرجاء المحاولة مرة أخرى أو إنشاء حساب جديد.');
            }
        });
    }

    // إنشاء حساب جديد
    if (loginForm && document.getElementById('new-username')) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('new-username').value;
            const password = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            if (password !== confirmPassword) {
                alert('كلمتا المرور غير متطابقتين');
                return;
            }
            let users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.find(user => user.username === username)) {
                alert('اسم المستخدم موجود بالفعل');
                return;
            }
            // فرض رفع صورة المستخدم
            let fileInput = document.getElementById('user-image-input');
            if (!fileInput) {
                fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*';
                fileInput.id = 'user-image-input';
                fileInput.style.display = 'none';
                document.body.appendChild(fileInput);
            }

            fileInput.onchange = function () {
                const file = fileInput.files[0];
                if (!file) {
                    alert('يجب إضافة صورة شخصية لإكمال التسجيل.');
                    return;
                }
                const reader = new FileReader();
                reader.onload = function (event) {
                    const user = { username, password, image: event.target.result };
                    users.push(user);
                    localStorage.setItem('users', JSON.stringify(users));
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    alert('تم إنشاء الحساب بنجاح! سيتم تحويلك للصفحة الرئيسية.');
                    window.location.href = "home.html";
                };
                reader.readAsDataURL(file);
            };

            fileInput.click();
        });
    }
});