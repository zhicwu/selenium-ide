// Licensed to the Software Freedom Conservancy (SFC) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The SFC licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import Router from "../../router";
import PlaybackState from "../../neo/stores/view/PlaybackState";
import Manager from "../../plugin/manager";
import logger from "../../neo/stores/view/Logs";
import { LogTypes } from "../../neo/ui-models/Log";

const router = new Router();

router.post("/command", (req, res) => {
  PlaybackState.setCommandState(req.commandId, req.state, req.message);
  res(true);
});

router.post("/log", (req, res) => {
  if (req.type === LogTypes.Error) {
    logger.error(`${Manager.getPlugin(req.id).name}: ${req.message}`);
  } else if (req.type === "warning") {
    logger.log(`${Manager.getPlugin(req.id).name} warning: ${req.message}`);
  } else {
    logger.log(`${Manager.getPlugin(req.id).name}: ${req.message}`);
  }
  res(true);
});

export default router;