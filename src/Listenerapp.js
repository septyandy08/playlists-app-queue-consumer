class Listenerapp {
    constructor(playlistsAppService, mailSenderapp) {
        this._playlistsAppService = playlistsAppService;
        this._mailSenderapp = mailSenderapp;

        this.listenapp = this.listenapp.bind(this);
    }

    async listenapp(message) {
        try {
            const { playlistId,targetEmail } = JSON.parse(message.content.toString());

            const playlists = await this._playlistsAppService.getPlaylistsapp(playlistId);
            const result = await this._mailSenderapp.sendEmailapp(targetEmail, JSON.stringify(playlists));
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Listenerapp;
