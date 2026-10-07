# ShopCheck work plan and completion rules

## Backlog

| Jira | Work | Start condition |
| --- | --- | --- |
| [KAN-11](https://ertihoxha874.atlassian.net/browse/KAN-11) | Prepare the local application and deterministic test data | Phase 2 learning checkpoint |
| [KAN-12](https://ertihoxha874.atlassian.net/browse/KAN-12) | Design the manual test plan and cases | Requirements available; learner drafts four cases before the assistant completes the set |
| [KAN-13](https://ertihoxha874.atlassian.net/browse/KAN-13) | Execute manual tests and verify confirmed fixes | Working increment and reviewed cases available |

Product implementation is tracked by stories KAN-6 through KAN-10 under Epic KAN-4. Do not create duplicate implementation tasks for every story. Add automation and release-validation tasks when those phases begin.

## Workflow

Target: To Do → In Progress → Ready for QA → In QA → Done. This is our portfolio workflow, not a known StarLabs workflow.

The last inspected board lacks In Progress. Until configured, keep active work in To Do with label in-progress and an explicit progress note. Ready for QA means the work can be verified, not that development has merely started. In QA means verification is actually underway.

The project lacked a Bug issue type at the last metadata inspection. Resolve this before filing confirmed defects. Do not treat suspected behavior as a Bug or create defect tickets just to fill the board.

Assignee identifies the accountable person; tickets remain unassigned until ownership is explicitly allocated. AI assistance is documented in descriptions/comments rather than represented as a fictitious team member. Priority indicates work order; issue defaults are not a completed risk assessment. Review priorities as testing risks are taught.

## Definition of Done

For product stories: acceptance criteria are implemented, the tested version is recorded, relevant checks have actual evidence, confirmed defects have documented outcomes, and required retests/regression are complete. Document any accepted remaining risks; do not silently omit unmet criteria.

For documentation tasks: the promised files/tickets exist, their references and completeness have been checked, learner participation required by the task is recorded, and unresolved limitations are explicit. Documentation completion is not product completion.

For execution tasks: actual results and evidence are recorded separately from cases, unexecuted cases remain Not Run, and blocked/untested areas are disclosed.

## Phase 1 checkpoint

Five product stories and 44 AC IDs are documented. Learner-authored cart isolation is preserved. Three backlog tasks are created. KAN-5 remains open for final learner review and explicit acknowledgment of the workflow fallback. No application implementation or execution is claimed.

Existing KAN-1, KAN-2 and KAN-3 are preserved; their purpose is still unconfirmed. Their status must not be counted as ShopCheck implementation progress.
