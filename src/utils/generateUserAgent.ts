import UserAgent from 'user-agents';

export default function generateUserAgent() {
	return new UserAgent().toString();
}
