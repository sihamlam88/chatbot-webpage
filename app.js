let botui = new BotUI('botui-app');

botui.message.add({
    content: 'Hello! How can I assist you today?'
});

botui.action.text({
    action: {
        placeholder: 'Ask me a question...'
    }
}).then(function (res) {
    botui.message.add({
        content: 'You said: ' + res.value
    });
});
