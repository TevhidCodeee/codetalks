export default function(data){
    return Object.keys(data || {}).map(key => ({
        id: key, // Firebase'in benzersiz anahtarı
        ...data[key], // Diğer veriler (ör. text, userMail, date)
      }));
    }
