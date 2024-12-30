function fetchUserData() {
    return fetch('/user')
        .then(user => user.json())
        .then(user => {
            return fetch(`/profile/${user.id}`)
                .then(profile => profile.json())
                .then(profile => {
                    return fetch(`/settings/${user.id}`)
                        .then(settings => settings.json())
                        .then(settings => {
                            return { user, profile, settings };
                        });
                });
        })
        .catch(error => {
            console.error(error);
        });
}
function fetchUserData1() {

    let user;
    let profile;
    let settings;

    fetch('/user')
        .then((user) => {
            user = user;
            return fetch(`/profile/${user.id}`)
        })
        .then((profile) => {
            profile = profile;
            return fetch(`/settings/${user.id}`)
        })
        .then((settings) => {
            settings = settings;
            return fetch(`/settings/${user.id}`)
        })
        .catch((error) => {
            console.error(error);
        })

    return { user, profile, settings };
}