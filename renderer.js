// Mostrar/Ocultar formularios
document.getElementById('goToRegister').addEventListener('click', () => {
  document.getElementById('loginForm').classList.remove('active');
  document.getElementById('registerForm').classList.add('active');
});

document.getElementById('goToLogin').addEventListener('click', () => {
  document.getElementById('registerForm').classList.remove('active');
  document.getElementById('loginForm').classList.add('active');
});

// Registro
document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const nombre = document.getElementById('registerNombre').value;
  const contrasena = document.getElementById('registerPassword').value;

  const result = await window.api.registerUser({ email, nombre, contrasena });

  if (result.success) {
    alert('Registro exitoso');
    document.getElementById('goToLogin').click();
  } else {
    alert('Error al registrar: ' + result.error);
  }
});

// Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nombre = document.getElementById('loginNombre').value;
  const contrasena = document.getElementById('loginPassword').value;

  const result = await window.api.loginUser({ nombre, contrasena });

  if (result.success) {
    alert('Bienvenido a EducaSync 👋');
  } else {
    alert('Credenciales incorrectas');
  }
});
// Animación entre formularios
function showForm(formId) {
  document.querySelectorAll('.form').forEach(f => f.classList.remove('active'));
  document.getElementById(formId).classList.add('active');
}

// Botón "Olvidé mi contraseña"
document.querySelector('.forgot-password').addEventListener('click', (e) => {
  e.preventDefault();
  showForm('recoverForm');
});

// Botón "Cancelar"
document.getElementById('cancelRecover').addEventListener('click', () => {
  showForm('loginForm');
});

// Guardar nueva contraseña
document.getElementById('recoverForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('recoverEmail').value;
  const nombre = document.getElementById('recoverNombre').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (newPassword !== confirmPassword) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  const result = await window.api.resetPassword({ email, nombre, newPassword });

  if (result.success) {
    alert("Contraseña actualizada correctamente.");
    showForm('loginForm');
  } else {
    alert("Error: " + result.error);
  }
});
