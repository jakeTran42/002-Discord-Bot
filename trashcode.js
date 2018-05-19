switch(current_hour) {
    case current_hour>6 && current_hour<10:
        message.channel.send('Morning');
        break;

    case current_hour>=10 && current_hour<12:
        message.channel.send(greeting.random_msg[0]);
        break;

    case current_hour>=12 && current_hour<16:
        message.channel.send('Afternoon');
        break

    case current_hour>=16 && current_hour<18:
        message.channel.send(greeting.random_msg[1]);
        break;

    case current_hour>=18 && current_hour<=23:
        message.channel.send('Evening')
        break;

    case current_hour>=0 && current_hour<=4:
        message.channel.send('Late')
        break;

    case current_hour>4 && current_hour<=6:
        message.channel.send('Nighter')
        break;
    
    default:
        message.channel.send(greeting.random_msg[3])
        break;
}
