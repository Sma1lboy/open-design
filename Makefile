.PHONY: install upstream-check upstream-bump smoke help

UPSTREAM_DIR := ref/open-codesign
UPSTREAM_FILE := packages/core/src/prompts/index.ts
SHA_FILE := .upstream-sha

help:
	@echo "make install         — symlink open-design/ into ~/.claude/skills/"
	@echo "make upstream-check  — compare current upstream prompt to .upstream-sha"
	@echo "make upstream-bump   — after a conscious merge, record new SHA"
	@echo "make smoke           — print the 6-prompt smoke test checklist"

install:
	./install.sh

upstream-check:
	@test -d $(UPSTREAM_DIR) || { echo "missing $(UPSTREAM_DIR) — clone it alongside this repo"; exit 1; }
	@new=$$(git -C $(UPSTREAM_DIR) rev-parse HEAD:$(UPSTREAM_FILE) 2>/dev/null); \
	old=$$(cat $(SHA_FILE) 2>/dev/null || echo none); \
	if [ "$$new" = "$$old" ]; then \
	  echo "up to date (SHA $$new)"; \
	else \
	  echo "upstream drift detected:"; \
	  echo "  recorded: $$old"; \
	  echo "  current:  $$new"; \
	  echo ""; \
	  git -C $(UPSTREAM_DIR) diff $$old $$new -- $(UPSTREAM_FILE) | head -200; \
	  echo ""; \
	  echo "after reviewing and merging relevant changes, run: make upstream-bump"; \
	fi

upstream-bump:
	@new=$$(git -C $(UPSTREAM_DIR) rev-parse HEAD:$(UPSTREAM_FILE)); \
	echo $$new > $(SHA_FILE); \
	echo "recorded new upstream SHA: $$new"

smoke:
	@echo "Run each prompt in a fresh Claude Code session from a scratch dir."
	@echo "Pass = valid .html opens in browser with zero console errors + passes anti-slop spot check."
	@echo ""
	@echo "1. 设计一个 SaaS 落地页"
	@echo "2. build a dashboard for a logistics company"
	@echo "3. mock up an iPhone onboarding screen"
	@echo "4. design a customer case study for Pretzel with before/after metrics"
	@echo "5. 做一个三档定价页"
	@echo "6. [negative] design a database schema for users     # should NOT fire"
