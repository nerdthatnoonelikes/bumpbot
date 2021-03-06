import Bot from '../src/Bot.js';
import StaticSource from '../src/Source/StaticSource.js';

test('fetches the source with the matching tag', done => {
    const bot = new Bot();

    bot.addSource(new StaticSource('expected', ['tag']));
    bot.addSource(new StaticSource('unexpected', ['no']));

    bot.configureChannel('test-channel', {
        delay: 10,
        callback: msg => {
            try{
                expect(msg).toBe('expected');
                done();
            } catch (e){
                done(e);
            }
        },
        tags: ['tag']
    });

    bot.notify('test-channel', new Date(0));
    bot.reviveChannels(new Date(15 * 1000));

});