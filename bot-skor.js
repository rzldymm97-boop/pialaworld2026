// bot-skor.js
// Skrip otomatisasi untuk simulasi & update skor Piala Dunia 2026
const fs = require('fs');

async function updateScores() {
  try {
    // Membaca file skor.json yang sudah ada di repositori Anda
    const dataRaw = fs.readFileSync('skor.json', 'utf8');
    const db = JSON.parse(dataRaw);

    console.log("Memulai pengecekan skor otomatis...");

    // =========================================================================
    // SIMULASI BOT: Karena pertandingan asli belum mulai saat ini (6 Juni 2026),
    // skrip ini diprogram untuk mensimulasikan hasil pertandingan Matchday 1 
    // agar Anda bisa langsung melihat fitur Anti-Spoiler & What If bekerja di HP!
    // =========================================================================
    
    let adaPerubahan = false;

    db.matches.forEach(match => {
      // Simulasi Match 1: Meksiko vs Indonesia
      if (match.match_id === 1 && match.status === "UPCOMING") {
        match.status = "FT"; // FT = Full Time (Selesai)
        match.home_team.score = 2; // Meksiko 2
        match.away_team.score = 1; // Indonesia 1
        // Data pencetak gol (opsional untuk statistik top skor)
        match.home_team.goals = [{ "player": "Raúl Jiménez", "minute": 23 }, { "player": "Santiago Giménez", "minute": 67 }];
        match.away_team.goals = [{ "player": "Ragnar Oratmangoen", "minute": 45 }];
        adaPerubahan = true;
      }
      
      // Simulasi Match 2: Kanada vs Amerika Serikat
      if (match.match_id === 2 && match.status === "UPCOMING") {
        match.status = "FT";
        match.home_team.score = 1; // Kanada 1
        match.away_team.score = 1; // AS 1
        match.home_team.goals = [{ "player": "Alfonso Davies", "minute": 12 }];
        match.away_team.goals = [{ "player": "Christian Pulisic", "minute": 89 }];
        adaPerubahan = true;
      }
    });

    if (adaPerubahan) {
      // Perbarui stempel waktu kapan data terakhir diperbarui
      db.last_updated = new Date().toISOString();
      
      // Simpan kembali data yang sudah terupdate ke skor.json
      fs.writeFileSync('skor.json', JSON.stringify(db, null, 2), 'utf8');
      console.log("Skor pertandingan berhasil diperbarui secara otomatis!");
    } else {
      console.log("Tidak ada pertandingan baru saat ini. Data tetap aman.");
    }

  } catch (error) {
    console.error("Gagal memperbarui skor:", error);
    process.exit(1);
  }
}

updateScores();
