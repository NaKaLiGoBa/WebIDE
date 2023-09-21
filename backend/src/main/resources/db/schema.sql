CREATE TABLE `members`
(
    `id`         BIGINT       NOT NULL,
    `email`      VARCHAR(255) NOT NULL,
    `password`   VARCHAR(255) NOT NULL,
    `name`       VARCHAR(255) NOT NULL,
    `salt`       VARCHAR(255) NOT NULL,
    `created_at` DATETIME     NOT NULL,
    `updated_at` DATETIME     NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `projects`
(
    `id`           BIGINT       NOT NULL,
    `name`         VARCHAR(255) NOT NULL,
    `description`  VARCHAR(255) NOT NULL,
    `created_at`   DATETIME     NOT NULL,
    `updated_at`   DATETIME     NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `member_projects`
(
    `id`         BIGINT       NOT NULL,
    `project_id` BIGINT       NOT NULL,
    `member_id`  BIGINT       NOT NULL,
    `role`       VARCHAR(255) NOT NULL,
    `created_at` DATETIME     NOT NULL,
    `updated_at` DATETIME     NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `chat_messages`
(
    `id`         BIGINT       NOT NULL,
    `message`    VARCHAR(255) NOT NULL,
    `created_at` DATETIME     NOT NULL,
    `updated_at` DATETIME     NOT NULL,
    `project_id` BIGINT       NOT NULL,
    `member_id`  BIGINT       NOT NULL,
    PRIMARY KEY (`id`)
);

ALTER TABLE `member_projects`
    ADD FOREIGN KEY (`project_id`) REFERENCES projects (`id`);

ALTER TABLE `member_projects`
    ADD FOREIGN KEY (`member_id`) REFERENCES members (`id`);

ALTER TABLE `chat_messages`
    ADD FOREIGN KEY (`project_id`) REFERENCES projects (`id`);

ALTER TABLE `chat_messages`
    ADD FOREIGN KEY (`member_id`) REFERENCES members (`id`);
