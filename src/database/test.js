const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    //inserir os dados

    proffyValue = {
        name: 'Michael Scott',
        avatar: 'https://pbs.twimg.com/profile_images/3040411861/7c55dd6ecd8df145225815cb152abfe9.png',
        whatsapp: '9982912821',
        bio: 'Gerente da Dunder Mifflin.Inc Scranton',
    }

    classValue = {
        subject: 1,
        cost:'20'
        // o proffy id vira pelo banco de dados
    }

    classScheduleValues = [
        //class_id vira pelo banco de dados apos cadastrarmos a aula
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }

    ]

    // await createProffy(db, {proffyValue,classValue,classScheduleValues})

    //Consultar os dados inseridos

    //Todos os proffys

    const selectedProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    //Consultar as classes de um determinado proffy
    // e trazer junto os dados do proffy
    const selectedClassesProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectedClassesProffys)

    //o horario que a pessoa trabalha, eh das 8h - 18h
    //o horario do time_from (8h) precisa ser menor ou igual ao horario solicitado 
    //o time_to precisa ser acima 

    const selectedClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "1"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
    `)

    // console.log(selectedClassesSchedules)
    

})