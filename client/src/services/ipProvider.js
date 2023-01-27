import { publicIpv4 } from 'public-ip';

export default {
  async getIp() {
    const ip = await publicIpv4({
      fallbackUrls: ['https://ifconfig.co/ip'],
    });

    return ip;
  },
};
