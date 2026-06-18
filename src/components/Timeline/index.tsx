import styles from "./styles.module.css";

const events = [
    {
        id: 1,
        title: "Onde Tudo Começou",
        date: "Dez 2025 - Jan 2026",
        description: "Os primeiros momentos da nossa história.",
        image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00",
        subEvents: [
            {
                date: "30/12/2025",
                description: "O dia em que nos vimos pela primeira vez.",
            },
            {
                date: "03/01/2026",
                description: "Nosso primeiro encontro e o primeiro beijo.",
            },
            {
                date: "17/01/2026",
                description: "O dia em que começamos a namorar.",
            },
            {
                date: "20/01/2026",
                description: "A primeira rosa.",
            },
        ],
    },
    {
        id: 2,
        title: "O Primeiro de Muitos",
        date: "Jun 2026",
        description: "Uma data para guardar com carinho.",
        image: "https://images.unsplash.com/photo-1544911845-1f34a3eb46b1",
        subEvents: [
            {
                date: "12/06/2026",
                description: "Nosso primeiro Dia dos Namorados juntos.",
            },
        ],
    },
];

export function Timeline() {
    return (
        <div className={styles.timeline}>
            {events.map((event, index) => {
                const even = index % 2 === 0;

                return (
                    <div key={event.id} className={`${styles.timelineEvent} ${!even ? styles.reverse : ""}`}>
                        <img className={styles.eventImage} src={event.image} alt={event.title} />

                        <div className={styles.eventContent}>
                            <span className={styles.eventDate}>{event.date}</span>
                            <h3 className={styles.eventTitle}>{event.title}</h3>
                            <p className={styles.eventDescription}>{event.description}</p>

                            {event.subEvents && (
                                <div className={styles.subEventsList}>
                                    {event.subEvents.map((sub, i) => (
                                        <div key={i} className={styles.subEventItem}>
                                            <span className={styles.subEventDate}>{sub.date}</span>
                                            <span className={styles.subEventDesc}>{sub.description}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
