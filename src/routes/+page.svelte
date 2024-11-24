<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { APP_NAME } from '$lib/config/constants';
</script>

<svelte:head>
	<title>{APP_NAME}</title>
	<meta
		name="description"
		content="Sveltekit Auth Starter - An open source auth starter project utilizing lucia-auth, skeleton ui, prisma and sveltekit."
	/>
</svelte:head>

<div class="flex-1">
	<section class="container grid items-center gap-6">
		<div class="flex max-w-[980px] flex-col items-start gap-2">
			<h1 class="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">Hello</h1>
			<p class="max-w-[700px] text-lg text-muted-foreground">
				Welcome to My Corner of the Internet! There's something wonderful about having hobbies that
				bring joy to everyday life. This website is a collection of the things that make my free
				time special. Here, you'll find a digital diary of my adventures in various hobbies. It's
				more than just a list of activities – it's a journey through experiences that have made me
				think, smile, and sometimes see the world a little differently. Feel free to explore and
				maybe find inspiration for your next hobby!
			</p>
		</div>
		<div class="flex gap-4">
			<Button on:click={() => goto('/auth/sign-in')}>Sign in</Button>
			<Button on:click={() => goto('/auth/sign-up')} variant="outline">Sign up</Button>
		</div>
	</section>
</div>
