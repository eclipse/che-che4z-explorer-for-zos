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
import * as vscode from "vscode";
export class DefaultCredentialsService {
    public requestCredentials(connection) {
            // tslint:disable-next-line: no-hardcoded-credentials
            return Promise.resolve({ username: "username", password: "password" });
    }

    public resetPassword(): void {

    }

    public async showErrorMessage(message: string): Promise<void> {
         vscode.window.showErrorMessage(message);
    }
}
