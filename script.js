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

                // Muat ulang tabel pesan setelah berhasil simpan
                loadPesan();
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

    // ==============================================================
    // D. LOAD PESAN — Ambil semua data dari Supabase via AJAX GET
    // ==============================================================
    function loadPesan() {
        $('#loadingMsg').removeClass('d-none');
        $('#pesanTableWrapper').addClass('d-none');
        $('#pesanTableBody').empty();
        $('#emptyMsg').addClass('d-none');

        $.ajax({
            url    : API_ENDPOINT + '?select=*&order=created_at.desc',
            type   : 'GET',
            headers: {
                'apikey'       : SUPABASE_ANON_KEY,
                'Authorization': 'Bearer ' + SUPABASE_ANON_KEY
            },
            dataType: 'json',
            success : function (data) {
                $('#loadingMsg').addClass('d-none');
                $('#pesanTableWrapper').removeClass('d-none');

                if (data && data.length > 0) {
                    $.each(data, function (index, row) {
                        // Format tanggal
                        const tgl = new Date(row.created_at);
                        const tglFormatted = tgl.toLocaleDateString('id-ID', {
                            day: '2-digit', month: 'short', year: 'numeric'
                        }) + ' ' + tgl.toLocaleTimeString('id-ID', {
                            hour: '2-digit', minute: '2-digit'
                        });

                        // Escape HTML untuk keamanan (cegah XSS)
                        function esc(str) {
                            return $('<div>').text(str || '').html();
                        }

                        const emailHtml = row.email
                            ? '<a href="mailto:' + esc(row.email) + '">' + esc(row.email) + '</a>'
                            : '<span style="color:var(--text-3)">—</span>';

                        const $tr = $('<tr>').append(
                            $('<td>').text(index + 1),
                            $('<td>').text(row.nama),
                            $('<td>').html(emailHtml),
                            $('<td>').text(row.pesan),
                            $('<td>').text(tglFormatted)
                        );

                        $('#pesanTableBody').append($tr);
                    });
                } else {
                    $('#emptyMsg').removeClass('d-none');
                }
            },
            error   : function () {
                $('#loadingMsg').addClass('d-none');
                $('#pesanTableWrapper').removeClass('d-none');
                $('#emptyMsg')
                    .removeClass('d-none')
                    .text('❌ Gagal memuat data. Periksa konfigurasi Supabase.');
            }
        });
    }

    // ==============================================================
    // E. TOMBOL REFRESH
    // ==============================================================
    $('#refreshBtn').on('click', function () {
        loadPesan();
    });

    // ==============================================================
    // F. AUTO-LOAD saat halaman pertama kali dibuka
    // ==============================================================
    loadPesan();

});
