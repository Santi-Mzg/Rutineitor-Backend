import Subscription from '../models/subscription.model.js';
import Workout from '../models/workout.model.js';
import User from '../models/user.model.js';
import webpush from 'web-push';
import cron from 'node-cron';

cron.schedule('0 9 * * *', async () => {
  console.log('Ejecutando recordatorios diarios...');

  const formattedToday = formatDate(new Date());
  const workoutsOfToday = await Workout.find({ fecha: formattedToday });

  for (const workout of workoutsOfToday) {
    const subscription = await Subscription.findOne({ user: workout.userId });
    if (!subscription) continue;

    const payload = JSON.stringify({
      title: '¡Recordatorio de entrenamiento! 💪',
      body: `Hoy te toca: ${workout.type}`,
      icon: '/pwa-192x192.png',
    });

    try {
      await webpush.sendNotification(subscription.subscription, payload);
      console.log(`Notificación enviada a ${workout.userId}`);
    } catch (err) {
      console.error('Error enviando notificación:', err);
    }
  }
},{
  timezone: "America/Argentina/Buenos_Aires"
});

cron.schedule('46 13 * * *', async () => {
  console.log('Ejecutando recordatorios nocturnos...');

  const users = await User.find({});

  for (const user of users) {
    const subscriptions = await Subscription.find({ user: user._id });
    if (!subscriptions) continue;

    const payload = JSON.stringify({
      title: '¿Entrenaste hoy? ',
      body: '¡Registra tu entrenamiento del día! 💪',
      icon: '/pwa-192x192.png',
    });

    for (const subscription of subscriptions) {
      try {
        await webpush.sendNotification(subscription.subscription, payload);
        console.log(`Notificación enviada a ${user._id}`);

      } catch (err) {
        console.error('Error enviando notificación:', err);
      }
    }
  }
}, {
  timezone: "America/Argentina/Buenos_Aires"
});


function formatDate(date){
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
};
