$(document).ready(function () {

    // ==============================================================
    // A. DOM MANIPULATION (classList.toggle)
    // ==============================================================
    const toggleBtn = document.getElementById("toggleDetailBtn");
    const detailInfo = document.getElementById("detailInfo");

    if (toggleBtn && detailInfo) {
        toggleBtn.addEventListener("click", function () {
            // Mengaktifkan / menonaktifkan class 'd-none' milik Bootstrap
            detailInfo.classList.toggle("d-none");

            // Mengubah teks tombol secara dinamis
            if (detailInfo.classList.contains("d-none")) {
                toggleBtn.textContent = "Lihat Jam Operasional";
            } else {
                toggleBtn.textContent = "Sembunyikan Jam Operasional";
            }
        });
    }

    // ==============================================================
    // B. EVENT HANDLER & VALIDASI FORM KONTAK
    // ==============================================================
    $("#contactForm").on("submit", function (e) {
        // 1. Cegah Reload Halaman
        e.preventDefault();

        const $alertBox = $("#formAlert");
        const $submitBtn = $("#submitBtn");

        // Ambil nilai input dan hilangkan spasi di awal/akhir
        const nama = $("#nama").val().trim();
        const email = $("#email").val().trim();
        const pesan = $("#pesan").val().trim();

        // 2. Validasi Sederhana (nama dan pesan tidak boleh kosong)
        if (nama === "" || pesan === "") {
            $alertBox
                .removeClass("d-none alert-success")
                .addClass("alert-danger")
                .text("Validasi gagal: Nama dan Pesan tidak boleh kosong!");
            return;
        }

        // 3. Serialize Data Form
        const formData = $(this).serialize();

        // Indikator loading sementara
        $submitBtn.prop("disabled", true).text("Mengirim...");
        $alertBox.addClass("d-none");

        // 4. Kirim Data via AJAX (POST) ke endpoint dummy
        const dummyEndpoint = "https://jsonplaceholder.typicode.com/posts";

        $.post(dummyEndpoint, formData, function (response, status) {
            // Callback jika server berhasil merespons
            $alertBox
                .removeClass("d-none alert-danger")
                .addClass("alert-success")
                .text("Status: Pesan berhasil terkirim! (Server respon: " + status + ")");

            // Reset input form
            $("#contactForm")[0].reset();
        })
        .fail(function (xhr, status, error) {
            // Callback jika terjadi error pada server
            $alertBox
                .removeClass("d-none alert-success")
                .addClass("alert-danger")
                .text("Gagal mengirim pesan: " + error);
        })
        .always(function () {
            // Kembalikan tombol ke keadaan semula
            $submitBtn.prop("disabled", false).text("Kirim Pesan");
        });

    });

});
