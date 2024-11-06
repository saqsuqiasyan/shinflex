import React, { useState } from 'react';

const FAQ = () => {
  const [lang] = useState(localStorage.getItem('lang') || 'hy');

  const handleGetData = (lang, [en, ru, hy]) => {
    return lang === 'en' ? en : lang === 'ru' ? ru : hy;
  };

  return (
    <div className="about-container">
      <section className="about-section">
        <h2 className="about-heading">{handleGetData(lang, ['The standard Lorem Ipsum passage', 'Стандартный отрывок Lorem Ipsum', 'Ստանդարտ Lorem Ipsum հատվածը'])}</h2>
        <p className="about-text">
          {handleGetData(lang, ["The customer is very important, the customer will be followed by the customer. To set the course of the ultricies of the disease layer. As it is right now, anyone needs a plane, no vehicles. It is not easy to use the technology of the valley. I'm sorry to be a high school employee. Suspendisse aliquet but mass in vulputate. Everyone gets pregnant.", 'Клиент очень важен, за клиентом пойдет клиент. Установить течение язвенного слоя болезни. Сейчас всем нужен самолет, а не транспорт. Использовать технологии долины непросто. Мне жаль, что я работаю в средней школе. Suspendisse aliquet, но масса в vulputate. Все беременеют.', 'Հաճախորդը շատ կարևոր է, հաճախորդին հետևելու է հաճախորդը։ Հիվանդության շերտի խոցերի ընթացքը սահմանելու համար: Ինչպես հիմա է, ցանկացածին պետք է ինքնաթիռ, ոչ մի տրանսպորտային միջոց: Հովտի տեխնոլոգիան օգտագործելը հեշտ չէ։ Ցավում եմ, որ ավագ դպրոցի աշխատող եմ: Suspendisse aliquet, but mass in vulputate. Բոլորը հղիանում են:'])}
        </p>
      </section>

      <section className="about-section">
        <h2 className="about-heading">{handleGetData(lang, ['At vero eos et accusamus et iusto odio dignissimos', 'Но ведь мы оба обвиняем их и заслуживаем справедливой ненависти.', 'Բայց, իրոք, մենք և՛ մեղադրում ենք նրանց, և՛ արդարացի ատելության ենք արժանի'])}</h2>
        <p className="about-text">
          {handleGetData(lang, ["The consumer does not need a thermal element. Tomorrow the lake is free, the price of which one should drink or not, protein from fear. Morbi eros bed, some eu some that, fringilla nor eros. It's a good place to take advantage of, not a cartoon.", 'Потребителю не нужен термоэлемент. Завтра озеро бесплатное, цена которого пить или нет, белок от страха. Морби-эрос-кровать, кое-что, кое-что, фрингилла или эрос. Это хорошее место, а не мультфильм.', 'Սպառողին ջերմային տարր պետք չէ։ Վաղը լիճն ազատ է, որի գինը խմել-չխմել, սպիտակուց վախից. Morbi eros մահճակալ, որոշ eu որոշ այն, fringilla nor eros. Դա լավ տեղ է օգտվելու համար, այլ ոչ թե մուլտֆիլմ:'])}
        </p>
      </section>

      <section className="about-section">
        <h2 className="about-heading">{handleGetData(lang, ['Certain circumstances and owing to the claims of duty or the obligations', 'Определенные обстоятельства и в силу требований долга или обязательств', 'Որոշակի հանգամանքներ և պարտականությունների կամ պարտավորությունների պահանջների պատճառով'])}</h2>
        <p className="about-text">
          {handleGetData(lang, ['But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.', 'Но я должен объяснить вам, как родилась вся эта ошибочная идея осуждения удовольствия и восхваления боли, и я дам вам полное описание этой системы и изложу подлинные учения великого исследователя истины, мастера-строителя человеческого счастья.', 'Բայց ես պետք է բացատրեմ ձեզ, թե ինչպես է ծնվել հաճույքը դատապարտելու և ցավը գովաբանելու այս սխալ գաղափարը, և ես ձեզ կներկայացնեմ համակարգի ամբողջական նկարագրությունը և կբացատրեմ ճշմարտության մեծ հետազոտողի, մարդկանց վարպետ կառուցողի իրական ուսմունքները: երջանկություն.'])}
        </p>
      </section>

      <section className="about-section">
        <h2 className="about-heading">{handleGetData(lang, ['The entire ultres laoreet is now pregnant', 'Вся ультрас лаорет теперь беременна.', 'Ամբողջ ultres laoreet-ն այժմ հղի է'])}</h2>
        <p className="about-text">
          {handleGetData(lang, ['But the cartoon pulvinar. Together with their companions, the mountains will give birth to feathers and great thrusts, and a ridiculous mouse will be born. Mauris takes up the pain of chocolate, the earth to drink, and the wise man of the quiver.', 'А вот мультик пульвинар. Вместе со своими товарищами горы родят перья и великие толчки, и на свет появится смешная мышь. Маурис берет на себя боль шоколада, землю для питья и мудреца из колчана.', 'Բայց մուլտֆիլմը pulvinar. Իրենց ուղեկիցների հետ սարերը կծնեն փետուրներ ու մեծ հարվածներ, կծնվի ծիծաղելի մուկ։ Մաուրիսը տանում է շոկոլադի ցավը, հողը՝ խմելու, և փարախի իմաստունը:'])}
        </p>
      </section>
    </div>
  );
};

export default FAQ;