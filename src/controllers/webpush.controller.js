import Subscription from '../models/subscription.model.js';
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:santymaszong@gmail.com',
  process.env.VAPID_PUBLIC_KEY || '',
  process.env.VAPID_PRIVATE_KEY || '',
);


export const sendWebPush = async (req, res) => {
	let subscription = null;
	const { endpoint, pushBody } = await req.body;

	try {
		const subscriptionData = await Subscription.findOne({ endpoint: endpoint });
        if (!subscriptionData) return res.status(404).json({ message: "Subscription not found" });

		subscription = {
			endpoint: subscriptionData?.endpoint || '',  
			expirationTime: subscriptionData?.expirationTime ? subscriptionData.expirationTime : null,
			keys: {
				p256dh: subscriptionData?.keys.p256dh || '',
				auth: subscriptionData?.keys.auth || '',
			},
		};

	} catch (err) {
		return res.status(400).json({ message: 'No subscription found or invalid JSON' });
	}

	if (!subscription?.endpoint) {
		return res.status(400).json({ message: 'Invalid subscription format' });
	}

	const pushPayload = JSON.stringify(pushBody);

	try {
		const response = await webpush.sendNotification(subscription, pushPayload);

		res.status(200).json({ message: 'Notification sent.' });
		res.json(response);
		
	} catch (error) {

		return res.status(500).json({ message: 'Failed to send notification' });
	}
}


export const subscribe = async (req, res) => {
    const { userId, subscription } = req.body;
    
    if (!subscription?.endpoint || !subscription?.keys?.p256dh || !subscription?.keys?.auth)
      return res.status(400).json({ error: 'Error subscription data incompleted' });
  
	try {
		const subscriptionFound = await Subscription.findOne({ endpoint: subscription.endpoint });
		if (!subscriptionFound) {
			await Subscription.create({
				endpoint: subscription.endpoint,
				expirationTime: subscription.expirationTime ? subscription.expirationTime : null,
				keys: subscription.keys,
				user: userId
			})
      	}

		res.status(200).json({ message: 'Subscription created.' });
    	res.json(subscriptionFound);

	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}


export const unsubscribe = async (req, res) => {
	const { endpoint } = await req.body;

	if (!endpoint) 
		return res.status(400).json({ error: 'Endpoint is required' });

	try {		
		const subscriptionFound = await Subscription.findOneAndDelete({ endpoint: endpoint });
        if (!subscriptionFound) return res.status(404).json({ message: "Subscription not found" });

		res.status(200).json({ message: 'Subscription deleted.' });

	} catch (error) {
		res.status(500).json({ message: 'Error when deleting Subscription' });
	}
}