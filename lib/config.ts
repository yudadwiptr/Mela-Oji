export const config = {
    coupleNames: process.env.NEXT_PUBLIC_COUPLE_NAMES || "Mela & Oji",
    eventDate: process.env.NEXT_PUBLIC_EVENT_DATE || "2025-09-28T00:00:00",
    bride: process.env.NEXT_PUBLIC_BRIDE_NAME || "Melani Alvina ( Mela )",
    brideNickName: process.env.NEXT_PUBLIC_BRIDE_NICKNAME || "Putri Pertama dari Bapak Sujiono dan Ibu Titin Sumarni",
    brideInstagram: process.env.NEXT_PUBLIC_BRIDE_INSTAGRAM || "melanialvina",
    brideBio: process.env.NEXT_PUBLIC_BRIDE_BIO || "",   
    groom: process.env.NEXT_PUBLIC_GROOM_NAME || "Muhammad Fahrul Fauzi ( Oji )",
    groomNickName: process.env.NEXT_PUBLIC_GROOM_NICKNAME || "Putra Kedua dari Bapak Abdulloh dan Ibu Surni",
    groomInstagram: process.env.NEXT_PUBLIC_GROOM_INSTAGRAM || "fauzifahrul_",
    groomBio: process.env.NEXT_PUBLIC_GROOM_BIO || "",
    bibleVerse: process.env.NEXT_PUBLIC_BIBLE_VERSE || "QS. Ar-Rum: 21",
    bibleVerseContent: process.env.NEXT_PUBLIC_BIBLE_VERSE_CONTENT || "“Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.”",
    timeline_1: process.env.NEXT_PUBLIC_YEAR_1 || "2023 - Awal Mula Pertemuan",
    timeline_1_content: process.env.NEXT_PUBLIC_YEAR_1_CONTENT || "Kami bertemu sebagai rekan kantor—dua sosok yang awalnya hanya saling bercanda dan saling dijadikan bahan ledekan oleh teman-teman. Gatau kenapa mereka seneng banget jodoh-jodohin dan ledekin kita berdua. Dan kita hanya balas dengan tawa dan candaan balik aja, ya karena kita tau itu semua cuma lelucon aja kan?",
    timeline_2: process.env.NEXT_PUBLIC_YEAR_2 || "2024 - Tunangan",
    timeline_2_content: process.env.NEXT_PUBLIC_YEAR_2_CONTENT || "Dengan status hubungan kita yang hanya sekedar rekan kerja, tiba tiba di hari ulangtahun mela dilamar disalah satu puncak gunung favoritnya dengan sebuah cincin yang manis. Katanya dia memang sengaja merencanakan ini semua dan sudah meminta ijin dengan keluarga nya dirumah untuk melamarku di puncak gunung ini. Sebuah moment yang selama ini sangat di impikan para wanita mungkin ya, tapi tidak disangka dengan orang yang tidak pernah terduga sebelumnya.\nManusia yang cuek dan dingin ini ternyata bisa juga bikin moment romantis yang sangat amat penuh makna. Kita emang ga pernah jadian, tapi dia selalu membuktikan dengan tindakan nya yang ga pernah di sangka-sangka. Ga lama setelah itu, dia datang ke rumah bertemu orangtua untuk meminta izin menikahiku.",
    timeline_3: process.env.NEXT_PUBLIC_YEAR_3 || "2025 - Lamaran dan Menikah",
    timeline_3_content: process.env.NEXT_PUBLIC_YEAR_3_CONTENT || "Setelah menjalin hubungan dengan status bertunangan yang mungkin ga banyak orang tau, tiba saat nya dia datang kembali untuk memperkenalkan keluarga besar nya, dengan acara yang sederhana namun berlangsung hikmat, dan di tahun yang sama pula yaitu 2025 ini atas izin Allah dan restu kedua orang tua, kami akan melangsungkan pernikahan yang insyaAllah akan di laksanakan pada Minggu, 28 September 2025.",
    digitalWallet: {
        enabled: process.env.NEXT_PUBLIC_DIGITAL_WALLET === 'true' || true,
        messageTitle: process.env.NEXT_PUBLIC_DIGITAL_WALLET_MESSAGE_TITLE || "Amplop Digital",
        message: process.env.NEXT_PUBLIC_DIGITAL_WALLET_MESSAGE || "Doa restu Anda adalah hadiah yang sangat berarti bagi kami. Namun jika ingin memberikan hadiah, Anda dapat mengirimkannya melalui:",
        bankAccounts: [
            {
                bank: process.env.NEXT_PUBLIC_BANK_1 || "BCA",
                accountNumber: process.env.NEXT_PUBLIC_BANK_1_ACCOUNT || "7380641211",
                accountName: process.env.NEXT_PUBLIC_BANK_1_NAME || "Melani Alvina"
            },
            {
                bank: process.env.NEXT_PUBLIC_BANK_2 || "Mandiri",
                accountNumber: process.env.NEXT_PUBLIC_BANK_2_ACCOUNT || "1330026071365",
                accountName: process.env.NEXT_PUBLIC_BANK_2_NAME || "Melani Alvina"
            }
        ]
    },
    islamicVerse: {
        enabled: process.env.NEXT_PUBLIC_ISLAMIC_VERSE === 'true' || true,
        content: process.env.NEXT_PUBLIC_ISLAMIC_VERSE_CONTENT || "\"Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.\"",
        source: process.env.NEXT_PUBLIC_ISLAMIC_VERSE_SOURCE || "(QS. Ar-Rum: 21)"
    },
    holyMatrimony: {
        enabled: process.env.NEXT_PUBLIC_HOLY_MATRIMONY === 'true' || true,
        time: process.env.NEXT_PUBLIC_HOLY_MATRIMONY_TIME || "10:00 WIB",
        place: process.env.NEXT_PUBLIC_HOLY_MATRIMONY_PLACE || "Masjid At-Taqwa",
        place_details: process.env.NEXT_PUBLIC_HOLY_MATRIMONY_PLACE_DETAILS || "Jl. KH. Ahmad Dahlan No. 15, Jakarta",
        googleMapsLink: process.env.NEXT_PUBLIC_HOLY_MATRIMONY_GOOGLE_MAPS || "https://maps.app.goo.gl/vPmfWux29qYYfkJTA",
    },
    weddingReception: {
        enabled: process.env.NEXT_PUBLIC_WEDDING_RECEPTION === 'true' || true,
        time: process.env.NEXT_PUBLIC_WEDDING_RECEPTION_TIME || "13:00 WIB",
        place: process.env.NEXT_PUBLIC_WEDDING_RECEPTION_PLACE || "Suncity Ballroom",
        place_details: process.env.NEXT_PUBLIC_WEDDING_RECEPTION_PLACE_DETAILS || "Jl. Raya Serpong, Suncity, Tangerang",
        googleMapsLink: process.env.NEXT_PUBLIC_WEDDING_RECEPTION_GOOGLE_MAPS || "https://maps.app.goo.gl/fQGiC37iEx6fcuNq8",
    },
    livestreaming: {
        enabled: process.env.NEXT_PUBLIC_LIVE_STREAMING === 'true',
        time: process.env.NEXT_PUBLIC_LIVE_STREAMING_TIME || "00:00",
        link: process.env.NEXT_PUBLIC_LIVE_STREAMING_LINK || "#",
        detail: process.env.NEXT_PUBLIC_LIVE_STREAMING_DETAIL || "Default Livestreaming Detail",
    },
    prewedding: {
        enabled: process.env.NEXT_PUBLIC_PREWEDDING === 'true',
        link: process.env.NEXT_PUBLIC_PREWEDDING_CODE_LINK_EMBED || "#",
        detail: process.env.NEXT_PUBLIC_PREWEDDING_DETAIL || "Default Prewedding Detail",
    },
    rsvp: {
        enabled: process.env.NEXT_PUBLIC_RSVP === 'true',
        detail: process.env.NEXT_PUBLIC_RSVP_DETAIL || "Default RSVP Detail",
    },
    thankyou: process.env.NEXT_PUBLIC_THANKYOU || "TERIMA KASIH ",
    thankyouDetail: process.env.NEXT_PUBLIC_THANKYOU_DETAIL || "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.",
};
