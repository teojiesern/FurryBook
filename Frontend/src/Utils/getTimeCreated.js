export function getTimeCreated(post){
    const createdDate = new Date(post.created);
        const currentDate = new Date();
        let displayTime;
        const timeDiff = currentDate.getTime() - createdDate.getTime();

        if (timeDiff < 86400000) {
            const minutes = Math.floor(timeDiff / 60000);
            const hours = Math.floor(timeDiff / 3600000);

            let formattedTime;
            if (minutes < 60) {
                formattedTime = `${minutes} minutes ago`;
            } else {
                formattedTime = `${hours} hours ago`;
            }

            displayTime = formattedTime;
        } else {
            const formattedDate = createdDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });

            displayTime = formattedDate;
        }
    return displayTime
}