// Request Body (post 그룹 생성)
const createGroup = (req, res) => {
    const { name, password, imageUrl, isPublic, introduction } = req.body;
  
    // 유효성 검사
    if (!name || !password || !imageUrl || isPublic === undefined || !introduction) {
      return res.status(400).json({ message: "잘못된 요청입니다" });
    }
  
    // Responses body
    const newGroup = {
      "id": 123, // 실제로는 데이터베이스에서 생성된 ID를 사용해야 함
      "name": "string",
      "imageUrl": "string",
      "isPublic": true,
      "likeCount": 0,
      "badges": [],
      "postCount": 0,
      "createdAt": new Date().toISOString(),
      "introduction" : "string"
    };
  
    // 성공적으로 그룹 생성 응답(201 등록 성공)
    return res.status(201).json(newGroup);
  };
  
  // 그룹 수정 로직 (PUT)
const updateGroup = (req, res) => {
    const { groupId } = req.params; // URL에서 groupId를 추출
    const { name, password, imageUrl, isPublic, introduction } = req.body; // 요청 바디에서 필요한 값 추출
  
    // 요청 양식 검증
    if (!name || !password || !imageUrl || isPublic === undefined || !introduction) {
      return res.status(400).json({ message: "잘못된 요청입니다" });
    }
  
    // 수정할 그룹을 찾기
    const group = {
        "id": 123,
        "name": "string",
        "imageUrl": "string",
        "isPublic": true,
        "likeCount": 0,
        "badges": ["badge1", "badge2"],
        "postCount": 0,
        "createdAt": "2024-02-22T07:47:49.803Z",
        "introduction": "string"
    }

    // 그룹이 존재하지 않을 경우
    if (!group) {
      return res.status(404).json({ message: "존재하지 않습니다" });
    }
  
    // 비밀번호 검증
    if (group.password !== password) {
      return res.status(403).json({ message: "비밀번호가 틀렸습니다" });
    }
  
    // 그룹 정보 업데이트
    group.name = name;
    group.imageUrl = imageUrl;
    group.isPublic = isPublic;
    group.introduction = introduction;
  
    // 응답으로 업데이트된 그룹 정보 반환
    return res.status(200).json({
      id: group.id,
      name: group.name,
      imageUrl: group.imageUrl,
      isPublic: group.isPublic,
      likeCount: group.likeCount || 0,
      badges: group.badges || [],
      postCount: group.postCount || 0,
      createdAt: group.createdAt || new Date().toISOString(),
      introduction: group.introduction
    });
  };
  
  // 그룹 삭제 로직 (DELETE)
const deleteGroup = (req, res) => {
    const { groupId } = req.params; // URL에서 groupId 추출
    const { password } = req.body; // 요청 바디에서 비밀번호 추출
  
    // 요청 양식 검증
    if (!password) {
      return res.status(400).json({ message: "잘못된 요청입니다" });
    }
  
    // 삭제할 그룹 찾기
    const groupIndex = groups.findIndex(g => g.id === parseInt(groupId));
  
    // 그룹이 존재하지 않을 경우
    if (groupIndex === -1) {
      return res.status(404).json({ message: "존재하지 않습니다" });
    }
  
    // 비밀번호 검증
    if (groups[groupIndex].password !== password) {
      return res.status(403).json({ message: "비밀번호가 틀렸습니다" });
    }
  
    // 그룹 삭제
    groups.splice(groupIndex, 1);
  
    // 삭제 성공 응답
    return res.status(200).json({ message: "그룹 삭제 성공" });
  };
  
  
  
  
// 그룹 목록 조회 로직 (GET)
const getGroups = (req, res) => {
    const {
      page = '1',
      pageSize = '10',
      sortBy = 'latest',
      keyword = '',
      isPublic = 'true'
    } = req.query;
  
    // 타입 변환
    const pageNumber = parseInt(page, 10);
    const pageSizeNumber = parseInt(pageSize, 10);
    const isPublicBoolean = isPublic === 'true';
  
    // 그룹 데이터 예시
    const groups = [
      {
        "id": 1,
        "name": "string",
        "imageUrl": "string",
        "isPublic": true,
        "likeCount": 0,
        "badgeCount": 0,
        "postCount": 0,
        "createdAt": "2024-02-22T07:47:49.803Z",
        "introduction": "string",
      },
      {
        "id": 2,
        "name": "string",
        "imageUrl": "string",
        "isPublic": true,
        "likeCount": 0,
        "badgeCount": 0,
        "postCount": 0,
        "createdAt": "2024-02-22T07:47:49.803Z",
        "introduction": "string",
      }
    ];
  
    // 필터링 및 페이징 처리
    let filteredGroups = groups.filter(group =>
      (isPublicBoolean ? group.isPublic === true : true) &&
      (keyword ? group.name.includes(keyword) || group.introduction.includes(keyword) : true)
    );
  
    // 정렬 처리 (sortBy)
    if (sortBy === 'mostPosted') {
      filteredGroups = filteredGroups.sort((a, b) => b.postCount - a.postCount);
    } else if (sortBy === 'mostLiked') {
      filteredGroups = filteredGroups.sort((a, b) => b.likeCount - a.likeCount);
    } else if (sortBy === 'mostBadge') {
      filteredGroups = filteredGroups.sort((a, b) => b.badgeCount - a.badgeCount);
    } // 'latest'의 경우는 이미 최신순으로 되어있다고 가정
  
    // 페이지네이션 적용
    const startIndex = (pageNumber - 1) * pageSizeNumber;
    const paginatedGroups = filteredGroups.slice(startIndex, startIndex + pageSizeNumber);
  
    // 응답 전송
    res.status(200).json({
      currentPage: pageNumber,
      totalPages: Math.ceil(filteredGroups.length / pageSizeNumber),
      totalItemCount: filteredGroups.length,
      data: paginatedGroups
    });
  };
  
  export { createGroup, updateGroup, deleteGroup, getGroups };
  