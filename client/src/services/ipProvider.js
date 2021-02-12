import publicIp from 'public-ip';

export default {
  async getIp() {
    const ip = await publicIp.v4({
      fallbackUrls: ['https://ifconfig.co/ip'],
    });

    return ip;
  },
};
