.PHONY: run lint lint-fix build

run:
	pnpm install
	pnpm dev

lint:
	pnpm lint

lint-fix:
	pnpm lint:fix

build:
	pnpm build