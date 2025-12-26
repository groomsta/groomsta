import dotenv from 'dotenv';
import app from './app';
import { CronService } from './shared/cron.service';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Initialize Background Jobs
CronService.init();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
