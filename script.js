$(document).ready(function () {

    // ==============================================================
    // KONFIGURASI SUPABASE
    // Ganti nilai di bawah ini dengan Project URL dan Anon Key kamu
    // dari: https://supabase.com/dashboard → Project Settings → API
    // ==============================================================
    const SUPABASE_URL     = 'https://ngwrvmocfvagoidhkxal.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_WmbgyULW_2AIxfrtiDu1VA_HSooekx7';

    // Endpoint REST API Supabase untuk tabel "pesan_kontak"
    const API_ENDPOINT = SUPABASE_URL + '/rest/v1/pesan_kontak';

    // Header standar untuk setiap request ke Supabase
    const SUPABASE_HEADERS = {
        'apikey'       : SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
        'Content-Type' : 'application/json',
        'Prefer'       : 'return=representation'
    };

    // ==============================================================
    // A. DOM MANIPULATION — Toggle Jam Operasional (classList.toggle)
    // ==============================================================
    const toggleBtn = document.getElementById('toggleDetailBtn');
    const detailInfo = document.getElementById('detailInfo');

    if (toggleBtn && detailInfo) {
        toggleBtn.addEventListener('click', function () {
            // Mengaktifkan / menonaktifkan class 'd-none' milik Bootstrap
            detailInfo.classList.toggle('d-none');

            // Mengubah teks tombol secara dinamis
            toggleBtn.textContent = detailInfo.classList.contains('d-none')
                ? 'Lihat Jam Operasional'
                : 'Sembunyikan Jam Operasional';
        });
    }

    // ==============================================================
    // B. FUNGSI BANTU — Tampilkan/sembunyikan alert form
    // ==============================================================
    function showAlert(type, message) {
        $('#formAlert')
            .removeClass('d-none alert-success alert-danger alert-warning')
            .addClass('alert-' + type)
            .html(message);
    }

    function hideAlert() {
        $('#formAlert').addClass('d-none').text('');
    }

    // ==============================================================
    // C. EVENT HANDLER & VALIDASI FORM KONTAK
    // ==============================================================
    $('#contactForm').on('submit', function (e) {
        // 1. Cegah Reload Halaman
        e.preventDefault();

        const $submitBtn = $('#submitBtn');

        // 2. Ambil nilai input dan hilangkan spasi di awal/akhir (.trim())
        const nama  = $('#nama').val().trim();
        const email = $('#email').val().trim();
        const pesan = $('#pesan').val().trim();

        // 3. Validasi Form Client-Side — nama dan pesan tidak boleh kosong
        if (nama === '' || pesan === '') {
            showAlert('danger', '⚠️ <strong>Validasi gagal:</strong> Nama dan Pesan tidak boleh kosong!');
            return;
        }

        // 4. Serialize Data Form (memenuhi ketentuan tugas .serialize())
        const formData = $(this).serialize();
        console.log('[Debug] Data terserialisasi:', formData);

        // Indikator loading sementara
        $submitBtn.prop('disabled', true).text('Mengirim...');
        hideAlert();

        // 5. Kirim Data via AJAX POST ke Supabase REST API
        $.ajax({
            url    : API_ENDPOINT,
            type   : 'POST',
            headers: SUPABASE_HEADERS,
            // Data dikirim sebagai JSON ke Supabase
            data   : JSON.stringify({
                nama  : nama,
                email : email,
                pesan : pesan
            }),
            dataType: 'json',
            success : function (response) {
                // Callback jika server berhasil merespons
                showAlert('success', '✅ Pesan berhasil terkirim dan disimpan ke database!');

                // Reset input form
                $('#contactForm')[0].reset();
            },
            error   : function (xhr, status, error) {
                // Callback jika terjadi error pada server
                let errMsg = error || 'Terjadi kesalahan pada server.';
                try {
                    const res = JSON.parse(xhr.responseText);
                    if (res.message) errMsg = res.message;
                } catch (err) { /* abaikan parse error */ }
                showAlert('danger', '❌ Gagal mengirim pesan: ' + errMsg);
            },
            complete: function () {
                // Kembalikan tombol ke keadaan semula
                $submitBtn.prop('disabled', false).text('Kirim Pesan');
            }
        });
    });

});
