import config from 'config';
import { server } from './app/app';

const PORT = config.get('port');
server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
