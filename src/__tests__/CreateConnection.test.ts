/*
 * Copyright (c) 2019 Broadcom.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *   Broadcom, Inc. - initial API and implementation
 */

jest.mock("vscode");
jest.mock("../utils");
jest.mock("../service/SettingsFacade");

import { createConnection } from "../commands/CreateConnection";
import { DefaultCredentialsService } from "../service/CredentialsService";
import { ZoweRestClient } from "../service/ZoweRestClient";
import { HostPanel } from "../ui/views/HostPanel";

describe("Create Connection", () => {
    it("Creates Connection", async () => {
        const creds = new DefaultCredentialsService();
        HostPanel.createHost = jest.fn();
        await createConnection({} as any, new ZoweRestClient(creds));
        expect(HostPanel.createHost).toHaveBeenCalled();
    });
});
