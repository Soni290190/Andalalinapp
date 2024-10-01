// Firebase authentication and login logic
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            console.error("Login error: ", error);
        });
});

// Logika pengajuan permohonan dan menyimpan di Firebase Realtime Database
document.getElementById('permohonanForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const namaPemohon = document.getElementById('namaPemohon').value;
    const lokasi = document.getElementById('lokasi').value;
    const dokumen = document.getElementById('dokumen').files[0];
    const userId = auth.currentUser.uid;

    const permohonanRef = ref(database, 'permohonan/' + userId);

    set(permohonanRef, {
        namaPemohon: namaPemohon,
        lokasi: lokasi,
        dokumen: dokumen.name,
        status: 'Menunggu Verifikasi'
    }).then(() => {
        alert("Permohonan berhasil diajukan");
    }).catch((error) => {
        console.error("Error submitting: ", error);
    });
});

// Menampilkan status permohonan
const userId = auth.currentUser.uid;
const statusPermohonanRef = ref(database, 'permohonan/' + userId);
get(statusPermohonanRef).then((snapshot) => {
    if (snapshot.exists()) {
        const data = snapshot.val();
        document.getElementById('statusPermohonan').innerText = "Status: " + data.status;
    } else {
        document.getElementById('statusPermohonan').innerText = "Belum ada permohonan.";
    }
}).catch((error) => {
    console.error("Error fetching status: ", error);
});

// Logika logout
document.getElementById('logout').addEventListener('click', function() {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    }).catch((error) => {
        console.error("Logout error: ", error);
    });
});
