
export const Languages = [
    {
        "language": "English",
        "countryCode": "US",
        "countryFlag": "https://flagcdn.com/w40/us.png",
        "modelName": "deepgram",
        "modelLangCode": "en-US"
    },
    {
        "language": "Spanish",
        "countryCode": "MX",
        "countryFlag": "https://flagcdn.com/w40/mx.png",
        "modelName": "deepgram",
        "modelLangCode": "es-MX"
    },
    {
        "language": "German",
        "countryCode": "DE",
        "countryFlag": "https://flagcdn.com/w40/de.png",
        "modelName": "deepgram",
        "modelLangCode": "de-DE"
    },
    {
        "language": "Hindi",
        "countryCode": "IN",
        "countryFlag": "https://flagcdn.com/w40/in.png",
        "modelName": "fonadalab",
        "modelLangCode": "hi-IN"
    },
    {
        "language": "Marathi",
        "countryCode": "IN",
        "countryFlag": "https://flagcdn.com/w40/in.png",
        "modelName": "fonadalab",
        "modelLangCode": "mr-IN"
    },
    {
        "language": "Telugu",
        "countryCode": "IN",
        "countryFlag": "https://flagcdn.com/w40/in.png",
        "modelName": "fonadalab",
        "modelLangCode": "te-IN"
    },
    {
        "language": "Tamil",
        "countryCode": "IN",
        "countryFlag": "https://flagcdn.com/w40/in.png",
        "modelName": "fonadalab",
        "modelLangCode": "ta-IN"
    },
    {
        "language": "French",
        "countryCode": "FR",
        "countryFlag": "https://flagcdn.com/w40/fr.png",
        "modelName": "deepgram",
        "modelLangCode": "fr-FR"
    },
    {
        "language": "Dutch",
        "countryCode": "NL",
        "countryFlag": "https://flagcdn.com/w40/nl.png",
        "modelName": "deepgram",
        "modelLangCode": "nl-NL"
    },
    {
        "language": "Italian",
        "countryCode": "IT",
        "countryFlag": "https://flagcdn.com/w40/it.png",
        "modelName": "deepgram",
        "modelLangCode": "it-IT"
    },
    {
        "language": "Japanese",
        "countryCode": "JP",
        "countryFlag": "https://flagcdn.com/w40/jp.png",
        "modelName": "deepgram",
        "modelLangCode": "ja-JP"
    }
];

export const DeepgramVoices = [
    {
        "model": "deepgram",
        "modelName": "aura-2-odysseus-en",
        "preview": "deepgram-aura-2-odysseus-en.wav",
        "gender": "male"
    },
    {
        "model": "deepgram",
        "modelName": "aura-2-thalia-en",
        "preview": "deepgram-aura-2-thalia-en.wav",
        "gender": "female"
    },
    {
        "model": "deepgram",
        "modelName": "aura-2-amalthea-en",
        "preview": "deepgram-aura-2-amalthea-en.wav",
        "gender": "female"
    },
    {
        "model": "deepgram",
        "modelName": "aura-2-andromeda-en",
        "preview": "deepgram-aura-2-andromeda-en.wav",
        "gender": "female"
    },
    {
        "model": "deepgram",
        "modelName": "aura-2-apollo-en",
        "preview": "deepgram-aura-2-apollo-en.wav",
        "gender": "male"
    }
];

export const FonadalabVoices = [
    {
        "model": "fonadalab",
        "modelName": "vaanee",
        "preview": "fonadalab-vaanee.mp3",
        "gender": "female"
    },
    {
        "model": "fonadalab",
        "modelName": "chaitra",
        "preview": "fonadalab-chaitra.mp3",
        "gender": "female"
    },
    {
        "model": "fonadalab",
        "modelName": "meghra",
        "preview": "fonadalab-meghra.mp3",
        "gender": "male"
    },
    {
        "model": "fonadalab",
        "modelName": "nirvani",
        "preview": "fonadalab-nirvani.mp3",
        "gender": "female"
    }
];

export const AllVoices = [...DeepgramVoices, ...FonadalabVoices];
