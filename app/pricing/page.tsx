import { title } from "@/components/primitives";
import signInWithGoogle from "@/components/GoogleLogin"

export default function PricingPage() {
	return (
		<><div>
			<h1 className={title()}>Pricing</h1>
		</div>
		<div>
			<button onClick={signInWithGoogle}>Sign in With Google</button>
		</div>
		</>
	);
}
