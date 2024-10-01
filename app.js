// Firebase Authentication
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Login berhasil!');
            loadDashboard();
        })
        .catch((error) => {
            console.error('Error login:', error);
            alert('Login gagal. Silakan coba lagi.');
        });
}

function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert('Registrasi berhasil!');
        })
        .catch((error) => {
            console.error('Error registrasi:', error);
            alert('Registrasi gagal. Silakan coba lagi.');
        });
}

// Load Dashboard Pemohon
function loadDashboard() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            document.getElementById('login').style.display = 'none';
            document.getElementById('dashboard').style.display = 'block';
            document.getElementById('adminDashboard').style.display = 'none';

            db.collection('permohonan').where('userId', '==', user.uid).onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    document.getElementById('statusPermohonan').innerText = data.status;
                    document.getElementById('tanggalUjian').innerText = data.tanggalUjian || 'Belum dijadwalkan';
                    if (data.skUrl) {
                        document.getElementById('skLink').innerHTML = `<a href="${data.skUrl}" download>Download SK</a>`;
                    } else {
                        document.getElementById('skLink').innerText = 'Belum diterbitkan';
                    }
                    displayNotifikasi(data.notifikasi);
                });
            });
        } else {
            document.getElementById('login').style.display = 'block';
            document.getElementById('dashboard').style.display = 'none';
        }
    });
}

// Show Pengajuan Form
function showPengajuanForm() {
    document.getElementById('pengajuanForm').style.display = 'block';
}

// Ajukan Permohonan
function ajukanPermohonan() {
    const namaPemohon = document.getElementById('namaPemohon').value;
    const alamatPemohon = document.getElementById('alamatPemohon').value;
    const nomorDokumen = document.getElementById('nomorDokumen').value;

    const userId = firebase.auth().currentUser.uid;

    db.collection('permohonan').add({
        namaPemohon: namaPemohon,
        alamatPemohon: alamatPemohon,
        nomorDokumen: nomorDokumen,
        userId: userId,
        status: 'Menunggu Verifikasi',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        notifikasi: []
    }).then(() => {
        alert('Permohonan berhasil diajukan!');
        document.getElementById('pengajuanForm').reset();
        document.getElementById('pengajuanForm').style.display = 'none';
        loadDashboard();
    }).catch((error) => {
        console.error('Error pengajuan:', error);
    });
}

// Batal Pengajuan
function cancelPengajuan() {
    document.getElementById('pengajuanForm').style.display = 'none';
}

// Display Notifikasi
function displayNotifikasi(notifikasi) {
    const notifikasiArea = document.getElementById('notifikasi');
    notifikasiArea.innerHTML = '';
    notifikasi.forEach(msg => {
        const p = document.createElement('p');
        p.innerText = msg;
        notifikasiArea.appendChild(p);
    });
}

// Load Dashboard Admin
function loadAdminDashboard() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';

    db.collection('permohonan').onSnapshot((snapshot) => {
        const permohonanList = document.getElementById('permohonanList');
        permohonanList.innerHTML = '';
        snapshot.forEach((doc) => {
            const data = doc.data();
            const div = document.createElement('div');
            div.innerHTML = `
                <h3>${data.namaPemohon}</h3>
                <p>Status: ${data.status}</p>
                <button onclick="verifikasi('${doc.id}')">Verifikasi</button>
            `;
            permohonanList.appendChild(div);
        });
    });
}

// Verifikasi Permohonan
function verifikasi(id) {
    db.collection('permohonan').doc(id).update({
        status: 'Diterima',
        notifikasi: firebase.firestore.FieldValue.arrayUnion('Permohonan Anda telah diterima.')
    }).then(() => {
        alert('Permohonan berhasil diverifikasi!');
    }).catch((error) => {
        console.error('Error verifikasi:', error);
    });
}
